import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';
import { deleteArticle } from '@/modules/articles-module/api/articles-api';

export const useDeleteArticle = () => {
  const client = useQueryClient();
  const {
    mutate: deleteArticleMutation,
    mutateAsync: deleteArticleMutationAsync,
    isLoading: isDeleting,
  } = useMutation({
    mutationKey: ['delete-article'],
    mutationFn: (id: number | null) => deleteArticle(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['articles'] });
    },
    ...noRefetch,
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

  return { deleteArticleMutation, deleteArticleMutationAsync, isDeleting };
};
