import { useMutation } from '@tanstack/react-query';
import { ILanguage, ILanguageID } from '@/types';
import { languageApi } from '@/services';

export const useUpdateLanguage = () => {
  const {
    isSuccess: isSuccessUpdateLanguage,
    isError: isErrorUpdateLanguage,
    mutate: mutateUpdateLanguage,
  } = useMutation(
    ['languages-list'],
    ({ languageID, native, name, order, code }: ILanguageID & ILanguage) =>
      languageApi.updateLanguage({ languageID, native, name, order, code })
  );

  return {
    mutateUpdateLanguage,
    isErrorUpdateLanguage,
    isSuccessUpdateLanguage,
  };
};
