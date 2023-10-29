import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';
import { deletePerson } from '@/modules/persons-module/api/persons-api';

export const useDeletePerson = () => {
  const client = useQueryClient();
  const { mutate: deletePersonMutation, isLoading: isDeleting } = useMutation({
    mutationKey: ['delete-person'],
    mutationFn: (id: number | null) => deletePerson(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['persons'] });
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

  return { deletePersonMutation, isDeleting };
};
