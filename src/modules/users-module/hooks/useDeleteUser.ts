import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { noRefetch } from '@/common/helpers/noRefetch';
import { deleteUser } from '@/modules/users-module/api/users-api';
import { IResponseError } from '@/types/response-error-message.type';

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
      const messages = error?.response?.data?.messages;
      messages?.forEach(({ message }) => {
        notification.error({
          message: `Error: ${message}`,
          placement: 'bottomLeft',
        });
      });
    },
  });

  return { deleteUserMutation, isDeleting };
};
