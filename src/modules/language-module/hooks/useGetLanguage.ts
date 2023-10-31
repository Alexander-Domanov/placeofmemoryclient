import { useQuery } from '@tanstack/react-query';
import { languageApi } from '@/services';
import { ILanguageID } from '@/types';
import { noRefetch } from '@/common/helpers/noRefetch';

export const useGetLanguage = ({ languageID }: ILanguageID) => {
  const {
    data: dataLanguage,
    isSuccess: isSuccessLanguage,
    isError: isErrorLanguage,
    isFetching: isFetchingLanguage,
    error: errorLanguage,
  } = useQuery(
    ['language', languageID],
    () => languageApi.getLanguage({ languageID }),
    {
      ...noRefetch,
    }
  );

  return {
    dataLanguage,
    isErrorLanguage,
    isSuccessLanguage,
    isFetchingLanguage,
    errorLanguage,
  };
};
