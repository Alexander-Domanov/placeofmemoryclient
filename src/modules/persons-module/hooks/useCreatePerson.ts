import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IResponseError } from '@/types/response-error-message.type';
import { createPerson } from '@/modules/persons-module/api/persons-api';
import { ICreatePerson } from '@/types';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useCreatePerson = () => {
  const client = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationKey: ['createPerson'],
    mutationFn: (personData: ICreatePerson) => createPerson(personData),
    // ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['persons']);
    },
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });

  return { createPerson: mutate, isCreating };
};
