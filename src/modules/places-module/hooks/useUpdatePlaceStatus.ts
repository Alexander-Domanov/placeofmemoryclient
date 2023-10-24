import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { noRefetch } from '@/common/helpers/noRefetch';
import { updatePlaceStatus } from '@/modules/places-module/api/places-api';
import { IResponseError } from '@/types/response-error-message.type';

export const useUpdatePlaceStatus = () => {
  const client = useQueryClient();
  const {
    mutate: updateStatusPlace,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationKey: ['updatePlaceStatus'],
    mutationFn: ({ id, status }: { id: number | null; status: string }) =>
      updatePlaceStatus(id, status),
    ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['places']);
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
  return { updateStatusPlace, isLoading, isSuccess };
};
