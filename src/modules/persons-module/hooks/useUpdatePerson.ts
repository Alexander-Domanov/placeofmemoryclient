import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICreatePerson } from '@/types';
import { IResponseError } from '@/types/response-error-message.type';
import { updatePerson } from '@/modules/persons-module/api/persons-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useUpdatePerson = () => {
  const client = useQueryClient();
  const { mutate: updatePersonMutation, isLoading: isUpdating } = useMutation({
    mutationKey: ['updatePerson'],
    mutationFn: ({ id, person }: { id: string; person: ICreatePerson }) =>
      updatePerson(id, person),
    onSuccess: () => {
      client.invalidateQueries(['persons']);
      client.invalidateQueries(['person']);
    },
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });
  return { updatePersonMutation, isUpdating };
};
