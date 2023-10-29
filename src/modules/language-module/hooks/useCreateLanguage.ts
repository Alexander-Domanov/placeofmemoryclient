import { useMutation } from '@tanstack/react-query';
import { ILanguage, ILanguageID } from '@/types';
import { languageApi } from '@/services';

export const useCreateLanguage = () => {
  const {
    isSuccess: isSuccessCreateLanguage,
    isError: isErrorCreateLanguage,
    mutate: mutateCreateLanguage,
  } = useMutation(
    ['languages-list'],
    ({ native, name, order, code }: ILanguage) =>
      languageApi.createLanguage({ native, name, order, code })
  );

  return {
    mutateCreateLanguage,
    isErrorCreateLanguage,
    isSuccessCreateLanguage,
  };
};
