import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPlaceMain } from '@/modules/places-main-module/api/places-main-api';

interface IUseGetPlaceMain {
  slug: string;
}
export const useGetPlaceMain = ({ slug }: IUseGetPlaceMain) => {
  const {
    data: dataPlace,
    isSuccess: isSuccessPlace,
    isError: isErrorPlace,
    isFetching: isFetchingPlace,
    isLoading,
  } = useQuery(['place-main', slug], () => getPlaceMain({ slug }), {
    ...noRefetch,
  });

  return {
    dataPlace,
    isErrorPlace,
    isSuccessPlace,
    isFetchingPlace,
    isLoading,
  };
};
