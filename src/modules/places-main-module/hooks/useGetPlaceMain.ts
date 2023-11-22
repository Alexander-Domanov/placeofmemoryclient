import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPlaceMain } from '@/services/api/places-api/places-main-api';
import { IPlace } from '@/types';

interface IUseGetPlaceMain {
  slug: string;
  place: IPlace;
}
export const useGetPlaceMain = ({ slug, place }: IUseGetPlaceMain) => {
  const {
    data: dataPlace,
    isSuccess: isSuccessPlace,
    isError: isErrorPlace,
    isFetching: isFetchingPlace,
    isLoading,
  } = useQuery(['place-main', slug], () => getPlaceMain({ slug }), {
    ...noRefetch,
    initialData: place,
  });

  return {
    dataPlace,
    isErrorPlace,
    isSuccessPlace,
    isFetchingPlace,
    isLoading,
  };
};
