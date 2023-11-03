import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { deletePlace } from '@/modules/places-module/api/places-api';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useDeletePlace = () => {
  const client = useQueryClient();
  const { mutate: deletePlaceMutation, isLoading: isDeleting } = useMutation({
    mutationKey: ['delete-place'],
    mutationFn: (id: number | null) => deletePlace(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['places'] });
      client.invalidateQueries(['user']);
    },
    ...noRefetch,
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });

  return { deletePlaceMutation, isDeleting };
};
