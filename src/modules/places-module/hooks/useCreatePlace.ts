import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlace } from '@/modules/places-module/api/places-api';
import { ICreatePlace } from '@/types';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

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
      ErrorNotification(error);
    },
  });

  return { createPlaceMutate: mutate, isCreating };
};
