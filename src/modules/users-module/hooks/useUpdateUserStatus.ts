import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserStatus } from '@/modules/users-module/api/users-api';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useUpdateUserStatus = () => {
  const client = useQueryClient();
  const {
    mutate,
    isLoading: isStatusUpdating,
    isSuccess,
  } = useMutation({
    mutationKey: ['updateUserStatus'],
    mutationFn: ({ id, status }: { id: number | null; status: string }) =>
      updateUserStatus(id, status),
    ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['users']);
      client.invalidateQueries(['user']);
    },
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });
  return { mutate, isStatusUpdating, isSuccess };
};
