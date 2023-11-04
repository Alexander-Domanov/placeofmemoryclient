import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getArticle } from '@/modules/articles-module/api/articles-api';
import { noRefetch } from '@/common/helpers/noRefetch';
import { useMeQuery } from '@/services';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useArticle = (id: string) => {
  const { data: me } = useMeQuery();

  const {
    data: article,
    isLoading,
    isSuccess,
    error,
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

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { article, isLoading, isSuccess };
};
