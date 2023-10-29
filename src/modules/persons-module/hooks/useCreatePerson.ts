import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { IResponseError } from '@/types/response-error-message.type';
import { createPerson } from '@/modules/persons-module/api/persons-api';
import { ICreatePerson } from '@/types';

export const useCreatePerson = () => {
  const client = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: ['createPerson'],
    mutationFn: (personData: ICreatePerson) => createPerson(personData),
    // ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['persons']);
    },
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

  return { createPerson: mutate, isLoading, isSuccess };
};
