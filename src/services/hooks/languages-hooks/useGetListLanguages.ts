import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { languageApi } from '@/services';
import { noRefetch } from '@/common/helpers/noRefetch';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useGetListLanguages = () => {
  const {
    data: languages,
    isLoading,
    isFetching: isFetchingDataListLanguagesLanguages,
    error,
  } = useQuery(['languages-list'], () => languageApi.getListLanguages(), {
    ...noRefetch,
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return {
    languages,
    isLoading,
    isFetchingDataListLanguagesLanguages,
  };
};
