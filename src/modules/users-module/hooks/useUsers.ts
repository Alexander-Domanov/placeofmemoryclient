import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getUsers } from '@/modules/users-module/api/users-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { useMeQuery } from '@/services';
import { IPaginationUsers } from '@/types';

export const useUsers = (data: IPaginationUsers) => {
  const { data: me } = useMeQuery();
  const {
    data: users,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: [
      'users',
      {
        ...data,

        lang: me?.lang,
      },
    ],
    queryFn: () => getUsers({ ...data }),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: 'always',
    retry: 0,
    enabled: !!me,
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { users, isLoading, isFetching };
};
