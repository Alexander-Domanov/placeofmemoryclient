import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getArticles } from '@/modules/articles-module/api/articles-api';
import { useMeQuery } from '@/services';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

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
    error,
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

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { articles, isLoading, refetch, isFetching, me };
};
