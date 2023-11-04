import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';
import { deleteArticle } from '@/modules/articles-module/api/articles-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

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
      ErrorNotification(error);
    },
  });

  return { deleteArticleMutation, deleteArticleMutationAsync, isDeleting };
};
