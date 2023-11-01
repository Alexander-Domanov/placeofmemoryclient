import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ILanguage, ILanguageID } from '@/types';
import { languageApi } from '@/services';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useUpdateLanguage = () => {
  const client = useQueryClient();
  const { isLoading: isUpdating, mutate: mutateUpdateLanguage } = useMutation(
    ['languages-list'],
    ({ languageID, native, name, order, code }: ILanguageID & ILanguage) =>
      languageApi.updateLanguage({ languageID, native, name, order, code }),
    {
      onSuccess: () => {
        client.invalidateQueries(['languages-list']);
      },
      onError: (error: IResponseError) => {
        ErrorNotification(error);
      },
    }
  );

  return {
    mutateUpdateLanguage,
    isUpdating,
  };
};
