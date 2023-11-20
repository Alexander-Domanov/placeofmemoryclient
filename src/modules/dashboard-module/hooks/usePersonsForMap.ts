import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { useMeQuery } from '@/services';
import { getPersonsForMap } from '@/modules/dashboard-module/api/persons-for-map-api';

export const usePersonsForMap = (lang: string, name?: string) => {
  const { data: me } = useMeQuery();
  const {
    data: persons,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['persons-for-map', { lang, name }],
    queryFn: () => getPersonsForMap(lang, name),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
    cacheTime: 0,
    staleTime: 0,
    retry: 0,
    enabled: !!me,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { persons, isFetching, isLoading };
};
