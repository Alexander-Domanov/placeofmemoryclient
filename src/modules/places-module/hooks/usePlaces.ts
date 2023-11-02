import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getPlaces } from '@/modules/places-module/api/places-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { noRefetch } from '@/common/helpers/noRefetch';
import { useMeQuery } from '@/services';

export const usePlaces = (
  page: number,
  pageSize: number,
  status: string,
  name: string,
  sorting: { field: string | null | number | bigint; order: string | null }
) => {
  const { data: me } = useMeQuery();
  const {
    data: places,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'places',
      { page, pageSize, status, name, sorting, lang: me?.lang },
    ],
    queryFn: () => getPlaces(page, pageSize, status, name, sorting),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
    cacheTime: 0,
    retry: 0,
    enabled: !!me,
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { places, isLoading };
};
