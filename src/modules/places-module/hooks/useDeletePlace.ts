import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { noRefetch } from '@/common/helpers/noRefetch';
import { deletePlace } from '@/modules/places-module/api/places-api';
import { IResponseError } from '@/types/response-error-message.type';

export const useDeletePlace = () => {
  const client = useQueryClient();
  const { mutate: deletePlaceMutation, isLoading: isDeleting } = useMutation({
    mutationKey: ['delete-place'],
    mutationFn: (id: number | null) => deletePlace(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['places'] });
    },
    ...noRefetch,
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

  return { deletePlaceMutation, isDeleting };
};
