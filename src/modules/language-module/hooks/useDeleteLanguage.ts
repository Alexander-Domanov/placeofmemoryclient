import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ILanguageID } from '@/types';
import { languageApi } from '@/services';

export const useDeleteLanguage = () => {
  const { invalidateQueries } = useQueryClient();
  const {
    isSuccess: isSuccessDeleteLanguage,
    isError: isErrorDeleteLanguage,
    isLoading: isLoadingDeleteLanguage,
    mutate: mutateDeleteLanguage,
  } = useMutation(
    ['delete-language'],
    ({ languageID }: ILanguageID) => languageApi.deleteLanguage({ languageID }),
    {
      onSuccess: () => invalidateQueries(['languages-list']),
    }
  );

  return {
    mutateDeleteLanguage,
    isErrorDeleteLanguage,
    isSuccessDeleteLanguage,
    isLoadingDeleteLanguage,
  };
};
