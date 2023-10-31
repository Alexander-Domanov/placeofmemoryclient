import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getUsers } from '@/modules/users-module/api/users-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useUsers = (
  page: number,
  pageSize: number,
  status: string,
  role: string,
  userName: string,
  sorting: { field: string | null | number | bigint; order: string | null },
  extensions: string[] = []
) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'users',
      { page, pageSize, status, role, userName, sorting, extensions },
    ],
    queryFn: () =>
      getUsers(page, pageSize, status, role, userName, sorting, extensions),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
    retry: 0,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { users, isLoading };
};
