import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPlaces } from '@/modules/places-module/api/places-api';

export const usePlaces = (
  page: number,
  pageSize: number,
  status: string,
  name: string,
  sorting: { field: string | null | number | bigint; order: string | null }
) => {
  const {
    data: places,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['places', { page, pageSize, status, name, sorting }],
    queryFn: () => getPlaces(page, pageSize, status, name, sorting),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
  });

  return { places, isLoading, refetch };
};
