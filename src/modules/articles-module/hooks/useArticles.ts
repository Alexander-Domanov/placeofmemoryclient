import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getArticles } from '@/modules/articles-module/api/articles-api';

export const useArticles = (
  page: number,
  pageSize: number,
  status: string,
  title: string,
  sorting: { field: string | null | number | bigint; order: string | null }
) => {
  const {
    data: articles,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['articles', { page, pageSize, status, title, sorting }],
    queryFn: () => getArticles(page, pageSize, status, title, sorting),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
  });

  return { articles, isLoading, refetch };
};