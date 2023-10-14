import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getUser } from '@/modules/users-modules/api/users-api';

export const useUser = (id: number | null) => {
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
