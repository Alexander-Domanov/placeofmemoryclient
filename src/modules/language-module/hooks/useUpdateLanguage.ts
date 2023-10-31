import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ILanguage, ILanguageID } from '@/types';
import { languageApi } from '@/services';

export const useUpdateLanguage = () => {
  const client = useQueryClient();
  const {
    isSuccess: isSuccessUpdateLanguage,
    isError: isErrorUpdateLanguage,
    isLoading: isLoadingUpdateLanguage,
    mutate: mutateUpdateLanguage,
  } = useMutation(
    ['languages-list'],
    ({ languageID, native, name, order, code }: ILanguageID & ILanguage) =>
      languageApi.updateLanguage({ languageID, native, name, order, code }),
    {
      onSuccess: () => {
        client.invalidateQueries(['languages-list']);
      },
    }
  );

  return {
    mutateUpdateLanguage,
    isErrorUpdateLanguage,
    isSuccessUpdateLanguage,
    isLoadingUpdateLanguage,
  };
};
