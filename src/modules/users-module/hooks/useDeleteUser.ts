import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { deleteUser } from '@/modules/users-module/api/users-api';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useDeleteUser = () => {
  const client = useQueryClient();
  const { mutate: deleteUserMutation, isLoading: isDeleting } = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: (id: number | null) => deleteUser(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['users'] });
    },
    ...noRefetch,
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });

  return { deleteUserMutation, isDeleting };
};
