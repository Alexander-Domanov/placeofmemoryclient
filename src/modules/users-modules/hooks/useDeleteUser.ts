import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { deleteUser } from '@/modules/users-modules/api/users-api';

export const useDeleteUser = () => {
  const client = useQueryClient();
  const { mutate: deleteUserMutation, isLoading: isDeleting } = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: (id: number | null) => deleteUser(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['users'] });
    },
    ...noRefetch,
  });

  return { deleteUserMutation, isDeleting };
};
