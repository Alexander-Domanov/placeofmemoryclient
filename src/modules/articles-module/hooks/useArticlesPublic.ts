import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getArticlesPublic } from '@/modules/articles-module/api/articles-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { IPaginationPublicArticles } from '@/types';

export const useArticlesPublic = (data: IPaginationPublicArticles) => {
  const {
    data: foundArticles,
    isLoading,
    refetch,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['articles-pub', { ...data }],
    queryFn: () => getArticlesPublic({ ...data }),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { foundArticles, isLoading, refetch, isFetching };
};
