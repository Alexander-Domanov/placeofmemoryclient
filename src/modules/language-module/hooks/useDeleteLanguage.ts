import { useMutation } from '@tanstack/react-query';
import { ILanguageID } from '@/types';
import { languageApi } from '@/services';

export const useDeleteLanguage = () => {
  const {
    isSuccess: isSuccessDeleteLanguage,
    isError: isErrorDeleteLanguage,
    mutate: mutateDeleteLanguage,
  } = useMutation(['languages-list'], ({ languageID }: ILanguageID) =>
    languageApi.deleteLanguage({ languageID })
  );

  return {
    mutateDeleteLanguage,
    isErrorDeleteLanguage,
    isSuccessDeleteLanguage,
  };
};
