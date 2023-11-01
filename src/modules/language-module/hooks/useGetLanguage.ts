import { useQuery } from '@tanstack/react-query';
import { languageApi } from '@/services';
import { ILanguageID } from '@/types';
import { noRefetch } from '@/common/helpers/noRefetch';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useGetLanguage = ({ languageID }: ILanguageID) => {
  const {
    data: dataLanguage,
    isSuccess: isSuccessLanguage,
    isError: isErrorLanguage,
    isFetching: isFetchingLanguage,
    error,
  } = useQuery(
    ['language', languageID],
    () => languageApi.getLanguage({ languageID }),
    {
      ...noRefetch,
    }
  );

  ErrorNotification(error);

  return {
    dataLanguage,
    isErrorLanguage,
    isSuccessLanguage,
    isFetchingLanguage,
  };
};
