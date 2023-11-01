import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ILanguageSwitcher } from '@/types';
import { languageApi } from '@/services';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

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
      onSuccess: (response) => {
        localStorage.setItem('accessToken', response.accessToken);
        client.invalidateQueries(['me']);
      },
      onError: (error: IResponseError) => {
        ErrorNotification(error);
      },
    }
  );

  return {
    mutateLangSwitcher,
    isErrorLangSwitcher,
    isSuccessLangSwitcher,
  };
};
