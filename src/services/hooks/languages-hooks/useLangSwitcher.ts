import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ILanguageSwitcher } from '@/types';
import { languageApi } from '@/services';

export const useLangSwitcher = () => {
  const client = useQueryClient();
  const {
    isSuccess: isSuccessLangSwitcher,
    isError: isErrorLangSwitcher,
    mutate: mutateLangSwitcher,
  } = useMutation(
    ['lang-switcher'],
    ({ lang }: ILanguageSwitcher) => languageApi.languageSwitcher({ lang }),
    {
      onSuccess: () => {
        client.invalidateQueries(['me']);
      },
    }
  );

  return {
    mutateLangSwitcher,
    isErrorLangSwitcher,
    isSuccessLangSwitcher,
  };
};
