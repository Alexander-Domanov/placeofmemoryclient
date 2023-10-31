import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { ICreatePerson } from '@/types';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';
import { updatePerson } from '@/modules/persons-module/api/persons-api';

export const useUpdatePerson = () => {
  const client = useQueryClient();
  const { mutate: updatePersonMutation, isLoading: isUpdating } = useMutation({
    mutationKey: ['updatePerson'],
    mutationFn: ({ id, person }: { id: string; person: ICreatePerson }) =>
      updatePerson(id, person),
    ...noRefetch,
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
  return { updatePersonMutation, isUpdating };
};
