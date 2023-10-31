import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { createPlace } from '@/modules/places-module/api/places-api';
import { ICreatePlace } from '@/types/places/create-place.type';
import { IResponseError } from '@/types/response-error-message.type';

export const useCreatePlace = () => {
  const client = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationKey: ['createPlace'],
    mutationFn: (placeData: ICreatePlace) => createPlace(placeData),
    // ...noRefetch,
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

  return { createPlaceMutate: mutate, isCreating };
};
