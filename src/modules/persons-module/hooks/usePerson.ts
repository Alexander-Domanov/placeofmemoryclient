import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPerson } from '@/modules/persons-module/api/persons-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { useMeQuery } from '@/services';

export const usePerson = (id: string | undefined | string[]) => {
  const { data: me } = useMeQuery();
  const {
    data: person,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['person', { id, lang: me?.lang }],
    queryFn: () => getPerson(id),
    enabled: !!id && !!me,
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

  return { person, isLoading, isSuccess, me };
};
