import { useQuery } from '@tanstack/react-query';
import { getArticle } from '@/modules/articles-module/api/articles-api';
import { noRefetch } from '@/common/helpers/noRefetch';

export const useArticle = (id: string) => {
  const {
    data: article,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['article', { id }],
    queryFn: () => getArticle(id),
    ...noRefetch,
    select: (response) => response.data,
    enabled: !!id,
  });

  return { article, isLoading, isSuccess };
};
