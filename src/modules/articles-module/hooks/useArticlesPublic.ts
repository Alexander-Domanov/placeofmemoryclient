import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getArticlesPublic } from '@/modules/articles-module/api/articles-api';
import { useMeQuery } from '@/services';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { IPaginationPublicArticles } from '@/types';

export const useArticlesPublic = (data: IPaginationPublicArticles) => {
  const { data: me } = useMeQuery();

  const {
    data: articles,
    isLoading,
    refetch,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['articles-pub', { ...data, lang: me?.lang }],
    queryFn: () => getArticlesPublic({ ...data }),
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
