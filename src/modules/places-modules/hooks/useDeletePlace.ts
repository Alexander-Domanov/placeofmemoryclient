import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { deletePlace } from '@/modules/places-modules/api/places-api';

export const useDeletePlace = () => {
  const client = useQueryClient();
  const { mutate: deletePlaceMutation, isLoading: isDeleting } = useMutation({
    mutationKey: ['delete-place'],
    mutationFn: (id: number | null) => deletePlace(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['places'] });
    },
    ...noRefetch,
  });

  return { deletePlaceMutation, isDeleting };
};
