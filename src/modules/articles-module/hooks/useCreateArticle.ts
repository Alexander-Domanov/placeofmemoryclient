import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createArticle } from '@/modules/articles-module/api/articles-api';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useCreateArticle = () => {
  const client = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationKey: ['create-article'],
    mutationFn: createArticle,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['articles'] });
    },
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });

  return { mutate, isCreating };
};
