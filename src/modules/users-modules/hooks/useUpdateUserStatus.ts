import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserStatus } from '@/modules/users-modules/api/users-api';
import { noRefetch } from '@/common/helpers/noRefetch';

export const useUpdateUserStatus = () => {
  const client = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: ['updateUserStatus'],
    mutationFn: ({ id, status }: { id: number | null; status: string }) =>
      updateUserStatus(id, status),
    ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['users']);
    },
  });
  return { mutate, isLoading, isSuccess };
};
