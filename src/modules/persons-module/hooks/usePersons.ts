import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPersons } from '@/modules/persons-module/api/persons-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { useMeQuery } from '@/services';
import { IPaginationPersons } from '@/types';

export const usePersons = (data: IPaginationPersons) => {
  const { data: me } = useMeQuery();
  const {
    data: persons,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['persons', { ...data, lang: me?.lang }],
    queryFn: () => getPersons({ ...data }),
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
