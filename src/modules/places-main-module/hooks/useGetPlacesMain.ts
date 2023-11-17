import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPlacesMainForSSR } from '@/modules/places-main-module/api/places-main-api';
import { IPlacesProps } from '@/modules/places-main-module';

export const useGetPlacesMain = ({
  name,
  country,
  city,
  pageNumber,
}: IPlacesProps) => {
  const { locale } = useRouter();
  const {
    data: dataPlaces,
    isSuccess: isSuccessPlaces,
    isError: isErrorPlaces,
    isFetching: isFetchingPlaces,
    isLoading,
  } = useQuery(
    ['places-main', name, country, city, pageNumber],
    () =>
      getPlacesMainForSSR({ name, country, city, lang: locale, pageNumber }),
    {
      ...noRefetch,
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
