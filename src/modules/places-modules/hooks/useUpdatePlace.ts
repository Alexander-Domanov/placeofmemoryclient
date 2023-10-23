import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICreatePlace } from '@/types';
import { updatePlace } from '@/modules/places-modules/api/places-api';
import { noRefetch } from '@/common/helpers/noRefetch';

export const useUpdatePlace = () => {
  const client = useQueryClient();
  const {
    mutate: updatePlaceById,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationKey: ['updatePlace'],
    mutationFn: ({
      id,
      place,
    }: {
      id: string | string[] | undefined;
      place: ICreatePlace;
    }) => updatePlace(id, place),
    ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['places']);
    },
  });
  return { updatePlaceById, isLoading, isSuccess };
};
