import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';
import { deletePerson } from '@/modules/persons-module/api/persons-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useDeletePerson = () => {
  const client = useQueryClient();
  const {
    mutate: deletePersonMutation,
    mutateAsync: deletePersonMutationAsync,
    isLoading: isDeleting,
  } = useMutation({
    mutationKey: ['delete-person'],
    mutationFn: (id: number | null) => deletePerson(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['persons'] });
      client.invalidateQueries({ queryKey: ['gallery'] });
      client.invalidateQueries(['user']);
    },
    ...noRefetch,
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });

  return { deletePersonMutation, deletePersonMutationAsync, isDeleting };
};
