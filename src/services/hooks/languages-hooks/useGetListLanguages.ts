import { useQuery } from '@tanstack/react-query';
import { languageApi } from '@/services';
import { noRefetch } from '@/common/helpers/noRefetch';

export const useGetListLanguages = () => {
  const {
    data: dataListLanguages,
    isSuccess: isSuccessDataListLanguagesLanguages,
    isError: isErrorDataListLanguagesLanguages,
    isFetching: isFetchingDataListLanguagesLanguages,
  } = useQuery(['languages-list'], () => languageApi.getListLanguages(), {
    ...noRefetch,
  });

  return {
    dataListLanguages,
    isSuccessDataListLanguagesLanguages,
    isErrorDataListLanguagesLanguages,
    isFetchingDataListLanguagesLanguages,
  };
};
