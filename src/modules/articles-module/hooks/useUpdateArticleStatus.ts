import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';
import { updateArticleStatus } from '@/modules/articles-module/api/articles-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useUpdateArticleStatus = () => {
  const client = useQueryClient();
  const {
    mutate: updateStatusArticle,
    isLoading: isStatusUpdating,
    isSuccess,
  } = useMutation({
    mutationKey: ['updateArticleStatus'],
    mutationFn: ({ id, status }: { id: number | null; status: string }) =>
      updateArticleStatus(id, status),
    ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['articles']);
      client.invalidateQueries(['article']);
      client.invalidateQueries({ queryKey: ['gallery'] });
      client.invalidateQueries(['user']);
    },
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });
  return { updateStatusArticle, isStatusUpdating, isSuccess };
};
