import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPerson } from '@/modules/persons-module/api/persons-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const usePerson = (id: string | undefined | string[]) => {
  const {
    data: person,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['person', { id }],
    queryFn: () => getPerson(id),
    enabled: !!id,
    select: (response) => response.data,
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

  return { person, isLoading, isSuccess };
};
