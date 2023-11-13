import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateArticle } from '@/modules/articles-module/api/articles-api';

import { IArticleCreate } from '@/types';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useUpdateArticle = (id: string) => {
  const client = useQueryClient();

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationKey: ['update-article'],
    mutationFn: (form: IArticleCreate) => updateArticle(id, form),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['articles'] });
      client.invalidateQueries({ queryKey: ['article'] });
    },
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });

  return { mutate, isUpdating };
};
