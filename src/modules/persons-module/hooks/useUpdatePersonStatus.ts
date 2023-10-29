import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';
import { updatePersonStatus } from '@/modules/persons-module/api/persons-api';

export const useUpdatePersonStatus = () => {
  const client = useQueryClient();
  const {
    mutate: updateStatusPerson,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationKey: ['updatePersonStatus'],
    mutationFn: ({ id, status }: { id: number | null; status: string }) =>
      updatePersonStatus(id, status),
    ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['persons']);
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
  return { updateStatusPerson, isLoading, isSuccess };
};
