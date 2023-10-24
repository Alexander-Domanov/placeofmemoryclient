import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { updateUserStatus } from '@/modules/users-module/api/users-api';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';

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
  return { mutate, isLoading, isSuccess };
};
