import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { updatePlaceStatus } from '@/modules/places-module/api/places-api';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useUpdatePlaceStatus = () => {
  const client = useQueryClient();
  const {
    mutate: updateStatusPlace,
    isLoading: isStatusUpdating,
    isSuccess,
  } = useMutation({
    mutationKey: ['updatePlaceStatus'],
    mutationFn: ({ id, status }: { id: string | null; status: string }) =>
      updatePlaceStatus(id, status),
    ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['places']);
      client.invalidateQueries(['place']);
      client.invalidateQueries(['persons']);
      client.invalidateQueries(['user']);
    },
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });
  return { updateStatusPlace, isStatusUpdating, isSuccess };
};
