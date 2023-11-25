import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IGetPlacesResponse, IPlacesProps } from '@/types';
import { getPlacesMain } from '@/services';

interface IProps {
  places: IGetPlacesResponse;
}
export const useGetPlacesMain = ({
  name,
  country,
  city,
  places,
  pageNumber,
}: IPlacesProps & IProps) => {
  const { locale } = useRouter();
  const {
    data: dataPlaces,
    isSuccess: isSuccessPlaces,
    isError: isErrorPlaces,
    isFetching: isFetchingPlaces,
    isLoading,
  } = useQuery(
    ['places-main', pageNumber, name, country, city],
    () => getPlacesMain({ name, country, city, lang: locale, pageNumber }),
    {
      ...noRefetch,
      initialData: places,
      cacheTime: 0,
      staleTime: 0,
    }
  );
  return {
    dataPlaces,
    isErrorPlaces,
    isSuccessPlaces,
    isFetchingPlaces,
    isLoading,
  };
};
