import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getUser } from '@/modules/users-module/api/users-api';

export const useUser = (id: string | undefined | string[]) => {
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['user', { id }],
    queryFn: () => getUser(id),
    enabled: !!id,
    select: (response) => response.data,
    ...noRefetch,
  });

  return { user, isLoading, isSuccess };
};
