import { useQuery } from '@tanstack/react-query';
import { getArticle } from '@/modules/articles-module/api/articles-api';
import { noRefetch } from '@/common/helpers/noRefetch';
import { useMeQuery } from '@/services';

export const useArticle = (id: string) => {
  const { data: me } = useMeQuery();

  const {
    data: article,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['article', { id, lang: me?.lang }],
    queryFn: () => getArticle(id),
    ...noRefetch,
    select: (response) => response.data,
    enabled: !!id && !!me,
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  return { article, isLoading, isSuccess };
};
