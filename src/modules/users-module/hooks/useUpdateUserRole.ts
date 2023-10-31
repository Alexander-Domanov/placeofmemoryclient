import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserRole } from '@/modules/users-module/api/users-api';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

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
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });
  return { mutate, isLoading, isSuccess };
};
