import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPlacesMain } from '@/modules/places-main-module/api/places-main-api';

export const useGetPlacesMain = () => {
  const {
    data: dataPlaces,
    isSuccess: isSuccessPlaces,
    isError: isErrorPlaces,
    isFetching: isFetchingPlaces,
    isLoading,
  } = useQuery(['places-main'], () => getPlacesMain({}), {
    cacheTime: 0,
    staleTime: 0,
    ...noRefetch,
  });

  return {
    dataPlaces,
    isErrorPlaces,
    isSuccessPlaces,
    isFetchingPlaces,
    isLoading,
  };
};
