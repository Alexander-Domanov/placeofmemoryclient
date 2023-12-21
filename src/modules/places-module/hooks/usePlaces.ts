import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getPlaces } from '@/modules/places-module/api/places-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { noRefetch } from '@/common/helpers/noRefetch';
import { useMeQuery } from '@/services';
import { IPaginationPlaces } from '@/types';

export const usePlaces = (data: IPaginationPlaces) => {
  const { data: me } = useMeQuery();
  const {
    data: places,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['places', { ...data, lang: me?.lang }],
    queryFn: () => getPlaces({ ...data, lang: me?.lang }),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
    cacheTime: 0,
    retry: 0,
    refetchOnMount: 'always',
    enabled: !!me,
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { places, isFetching, isLoading, me };
};
