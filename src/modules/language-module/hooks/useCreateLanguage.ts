import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ILanguage } from '@/types';
import { languageApi } from '@/services';

export const useCreateLanguage = () => {
  const client = useQueryClient();
  const {
    isSuccess: isSuccessCreateLanguage,
    isError: isErrorCreateLanguage,
    mutate: mutateCreateLanguage,
    isLoading: isLoadingCreateLanguage,
    error: errorCreateLanguage,
  } = useMutation(
    ['languages-create'],
    ({ native, name, order, code }: ILanguage) =>
      languageApi.createLanguage({ native, name, order, code }),
    {
      onSuccess: () => client.invalidateQueries(['languages-list']),
    }
  );
  return {
    mutateCreateLanguage,
    isErrorCreateLanguage,
    isSuccessCreateLanguage,
    isLoadingCreateLanguage,
    errorCreateLanguage,
  };
};
