import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getUsers } from '@/modules/users-module/api/users-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { useMeQuery } from '@/services';

export const useUsers = (
  page: number,
  pageSize: number,
  status: string,
  role: string,
  userName: string,
  sorting: { field: string | null | number | bigint; order: string | null }
) => {
  const { data: me } = useMeQuery();
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'users',
      {
        page,
        pageSize,
        status,
        role,
        userName,
        sorting,

        lang: me?.lang,
      },
    ],
    queryFn: () => getUsers(page, pageSize, status, role, userName, sorting),
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

  return { users, isLoading };
};
