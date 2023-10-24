import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';
import { updateArticleStatus } from '@/modules/articles-module/api/articles-api';

export const useUpdateArticleStatus = () => {
  const client = useQueryClient();
  const {
    mutate: updateStatusArticle,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationKey: ['updateArticleStatus'],
    mutationFn: ({ id, status }: { id: number | null; status: string }) =>
      updateArticleStatus(id, status),
    ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['articles']);
    },
    onError: (error: IResponseError) => {
      const messages = error?.response?.data?.messages;
      messages?.forEach(({ message }) => {
        notification.error({
          message: `Error: ${message}`,
          placement: 'bottomLeft',
        });
      });
    },
  });
  return { updateStatusArticle, isLoading, isSuccess };
};
