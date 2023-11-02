import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getUser } from '@/modules/users-module/api/users-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { useMeQuery } from '@/services';

export const useUser = (
  id: string,
  page: number,
  pageSize: number,
  status: string,
  name: string,
  sorting: { field: string | null | number | bigint; order: string | null },
  extensions: string[] = []
) => {
  const { data: me } = useMeQuery();
  const {
    data: user,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: [
      'user',
      { id, page, pageSize, status, name, sorting, extensions, lang: me?.lang },
    ],
    queryFn: () =>
      getUser(id, page, pageSize, status, name, sorting, extensions),
    enabled: !!id && !!me,
    select: (response) => response.data,
    ...noRefetch,
    retry: 0,
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { user, isLoading, isSuccess };
};
