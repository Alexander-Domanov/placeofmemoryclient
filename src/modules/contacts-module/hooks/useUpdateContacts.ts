import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePlace } from '@/modules/places-module/api/places-api';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { updateContacts } from '@/modules/contacts-module/api/contacts-api';
import { IContactsForm } from '@/types';

export const useUpdateContacts = () => {
  const client = useQueryClient();
  const { mutate: updateContactsMutate, isLoading: isUpdating } = useMutation({
    mutationKey: ['updatePlace'],
    mutationFn: ({ data }: { data: IContactsForm }) => updateContacts(data),
    ...noRefetch,
    onSuccess: () => {
      client.invalidateQueries(['contacts']);
    },
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });
  return { updateContactsMutate, isUpdating };
};
