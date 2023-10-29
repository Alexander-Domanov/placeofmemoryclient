import { useQuery } from '@tanstack/react-query';
import { languageApi } from '@/services';
import { ILanguageID } from '@/types';

export const useGetLanguage = ({ languageID }: ILanguageID) => {
  const {
    data: dataLanguage,
    isSuccess: isSuccessLanguage,
    isError: isErrorLanguage,
    isFetching: isFetchingLanguage,
  } = useQuery(['language', languageID], () =>
    languageApi.getLanguage({ languageID })
  );

  return {
    dataLanguage,
    isErrorLanguage,
    isSuccessLanguage,
    isFetchingLanguage,
  };
};
