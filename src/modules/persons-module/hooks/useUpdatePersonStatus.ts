import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';
import { updatePersonStatus } from '@/modules/persons-module/api/persons-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useUpdatePersonStatus = () => {
  const client = useQueryClient();
  const {
    mutate: updateStatusPerson,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationKey: ['updatePersonStatus'],
    mutationFn: ({ id, status }: { id: string | null; status: string }) =>
      updatePersonStatus(id, status),
    ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['persons']);
      client.invalidateQueries(['user']);
    },
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });
  return { updateStatusPerson, isLoading, isSuccess };
};
