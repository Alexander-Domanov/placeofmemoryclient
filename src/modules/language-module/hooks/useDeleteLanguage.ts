import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ILanguageID } from '@/types';
import { languageApi } from '@/services';

export const useDeleteLanguage = () => {
  const client = useQueryClient();
  const {
    isSuccess: isSuccessDeleteLanguage,
    isError: isErrorDeleteLanguage,
    isLoading: isLoadingDeleteLanguage,
    mutate: mutateDeleteLanguage,
    error: errorDeleteLanguage,
  } = useMutation(
    ['delete-language'],
    ({ languageID }: ILanguageID) => languageApi.deleteLanguage({ languageID }),
    {
      onSuccess: () => {
        client.invalidateQueries(['languages-list']);
      },
    }
  );

  return {
    mutateDeleteLanguage,
    isErrorDeleteLanguage,
    isSuccessDeleteLanguage,
    isLoadingDeleteLanguage,
    errorDeleteLanguage,
  };
};
