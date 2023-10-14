import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getUsers } from '@/modules/users-modules/api/users-api';

export const useUsers = (
  page: number,
  pageSize: number,
  status: string,
  role: string,
  userName: string,
  sorting: { field: string | null | number | bigint; order: string | null },
  extensions: string[] = []
) => {
  const { data: users, isLoading } = useQuery({
    queryKey: [
      'users',
      { page, pageSize, status, role, userName, sorting, extensions },
    ],
    queryFn: () =>
      getUsers(page, pageSize, status, role, userName, sorting, extensions),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
  });

  return { users, isLoading };
};
