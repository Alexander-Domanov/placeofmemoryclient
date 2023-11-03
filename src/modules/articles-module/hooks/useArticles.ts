import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getArticles } from '@/modules/articles-module/api/articles-api';
import { useMeQuery } from '@/services';

export const useArticles = (
  page: number,
  pageSize: number,
  status: string,
  title: string,
  sorting: { field: string | null | number | bigint; order: string | null }
) => {
  const { data: me } = useMeQuery();

  const {
    data: articles,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [
      'articles',
      { page, pageSize, status, title, sorting, lang: me?.lang },
    ],
    queryFn: () => getArticles(page, pageSize, status, title, sorting),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: 'always',
    enabled: !!me,
  });

  return { articles, isLoading, refetch, isFetching };
};
