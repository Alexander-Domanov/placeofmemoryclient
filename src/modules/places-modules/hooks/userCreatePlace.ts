import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlace } from '@/modules/places-modules/api/places-api';
import { ICreatePlace } from '@/types/places/create-place.type';

export const useCreatePlace = () => {
  const client = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: ['createPlace'],
    mutationFn: (placeData: ICreatePlace) => createPlace(placeData),
    // ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['places']);
    },
  });

  return { createPlace: mutate, isLoading, isSuccess };
};
