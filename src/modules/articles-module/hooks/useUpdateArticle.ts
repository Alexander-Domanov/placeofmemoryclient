import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateArticle } from '@/modules/articles-module/api/articles-api';

import { IArticleCreate } from '@/types/articles/create-articles.type';

export const useUpdateArticle = (id: string) => {
  const client = useQueryClient();

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationKey: ['update-article'],
    mutationFn: (form: IArticleCreate) => updateArticle(id, form),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['articles'] });
    },
  });

  return { mutate, isUpdating };
};
