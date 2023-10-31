import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { ICreatePlace } from '@/types';
import { updatePlace } from '@/modules/places-module/api/places-api';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';

export const useUpdatePlace = () => {
  const client = useQueryClient();
  const { mutate: updatePlaceMutate, isLoading: isUpdating } = useMutation({
    mutationKey: ['updatePlace'],
    mutationFn: ({ id, place }: { id: string; place: ICreatePlace }) =>
      updatePlace(id, place),
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
  return { updatePlaceMutate, isUpdating };
};
