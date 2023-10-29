import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getTitlePlaces } from '@/modules/places-module/api/places-api';

export const useTitlePlaces = (
  page: number,
  pageSize: number,
  name: string
) => {
  const {
    data: titlePlaces,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['title-places', { page, pageSize, name }],
    queryFn: () => getTitlePlaces(page, pageSize, name),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
  });

  return { titlePlaces, isLoading, refetch };
};
