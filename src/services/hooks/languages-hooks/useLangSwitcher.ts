import { useMutation } from '@tanstack/react-query';
import { ILanguageSwitcher } from '@/types';
import { languageApi } from '@/services';

export const useLangSwitcher = () => {
  const {
    isSuccess: isSuccessLangSwitcher,
    isError: isErrorLangSwitcher,
    mutate: mutateLangSwitcher,
  } = useMutation(['me'], ({ lang }: ILanguageSwitcher) =>
    languageApi.languageSwitcher({ lang })
  );

  return {
    mutateLangSwitcher,
    isErrorLangSwitcher,
    isSuccessLangSwitcher,
  };
};
