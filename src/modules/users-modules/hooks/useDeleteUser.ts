import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { deleteUser } from '@/modules/users-modules/api/users-api';

export const useDeleteUser = (id: number | null) => {
  const client = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: ['deleteUser', { id }],
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      client.invalidateQueries(['users']);
    },
    ...noRefetch,
  });

  return { mutate, isLoading, isSuccess };
};
