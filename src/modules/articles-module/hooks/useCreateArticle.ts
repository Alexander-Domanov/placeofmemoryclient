import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createArticle } from '@/modules/articles-module/api/articles-api';

export const useCreateArticle = () => {
  const client = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationKey: ['create-article'],
    mutationFn: createArticle,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['articles'] });
    },
  });

  return { mutate, isCreating };
};
