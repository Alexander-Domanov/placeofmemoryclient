import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPersons } from '@/modules/persons-module/api/persons-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const usePersons = (
  page: number,
  pageSize: number,
  status: string,
  name: string,
  sorting: { field: string | null | number | bigint; order: string | null }
) => {
  const {
    data: persons,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['persons', { page, pageSize, status, name, sorting }],
    queryFn: () => getPersons(page, pageSize, status, name, sorting),
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

  return { persons, isLoading, refetch };
};
