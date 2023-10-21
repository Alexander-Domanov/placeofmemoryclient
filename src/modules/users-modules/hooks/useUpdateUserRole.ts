import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserRole } from '@/modules/users-modules/api/users-api';
import { noRefetch } from '@/common/helpers/noRefetch';

export const useUpdateUserRole = () => {
  const client = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: ['updateUserRole'],
    mutationFn: ({ id, role }: { id: number | null; role: string }) =>
      updateUserRole(id, role),
    ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['users']);
    },
  });
  return { mutate, isLoading, isSuccess };
};
