import { useQuery } from '@tanstack/react-query';
import { languageApi } from '@/services';

export const useGetListLanguages = () => {
  const {
    data: dataListLanguages,
    isSuccess: isSuccessDataListLanguagesLanguages,
    isError: isErrorDataListLanguagesLanguages,
    isFetching: isFetchingDataListLanguagesLanguages,
  } = useQuery(['languages-list'], () => languageApi.getListLanguages());

  return {
    dataListLanguages,
    isSuccessDataListLanguagesLanguages,
    isErrorDataListLanguagesLanguages,
    isFetchingDataListLanguagesLanguages,
  };
};
