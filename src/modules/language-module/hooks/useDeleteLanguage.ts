import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { languageApi } from '@/services';
import { ILanguageID } from '@/types';

export const useDeleteLanguage = () => {
  const client = useQueryClient();
  const { isLoading: isDeleting, mutate: mutateDeleteLanguage } = useMutation(
    ['delete-language'],
    ({ languageID }: ILanguageID) => languageApi.deleteLanguage({ languageID }),
    {
      onSuccess: () => {
        client.invalidateQueries(['languages-list']);
      },
      onError: (error: IResponseError) => {
        ErrorNotification(error);
      },
    }
  );

  return { mutateDeleteLanguage, isDeleting };
};
