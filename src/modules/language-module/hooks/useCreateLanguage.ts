import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ILanguage } from '@/types';
import { languageApi } from '@/services';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useCreateLanguage = () => {
  const client = useQueryClient();
  const {
    isSuccess: isSuccessCreateLanguage,
    isError: isErrorCreateLanguage,
    mutate: mutateCreateLanguage,
    isLoading: isLoadingCreateLanguage,
    error,
  } = useMutation(
    ['languages-create'],
    ({ native, name, order, code }: ILanguage) =>
      languageApi.createLanguage({ native, name, order, code }),
    {
      onSuccess: () => client.invalidateQueries(['languages-list']),
    }
  );

  ErrorNotification(error);

  return {
    mutateCreateLanguage,
    isErrorCreateLanguage,
    isSuccessCreateLanguage,
    isLoadingCreateLanguage,
  };
};
