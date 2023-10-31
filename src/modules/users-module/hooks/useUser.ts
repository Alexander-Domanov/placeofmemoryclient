import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getUser } from '@/modules/users-module/api/users-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useUser = (id: string | undefined | string[]) => {
  const {
    data: user,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['user', { id }],
    queryFn: () => getUser(id),
    enabled: !!id,
    select: (response) => response.data,
    ...noRefetch,
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { user, isLoading, isSuccess };
};
