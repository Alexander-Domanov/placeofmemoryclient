import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { updatePlaceStatus } from '@/modules/places-modules/api/places-api';

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
  });
  return { updateStatusPlace, isLoading, isSuccess };
};
