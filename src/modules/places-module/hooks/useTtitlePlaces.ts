import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getTitlePlaces } from '@/modules/places-module/api/places-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { useMeQuery } from '@/services';

export const useTitlePlaces = (data: {
  pageNumber: number;
  pageSize: number;
  name?: string;
  city?: string;
  country?: string;
}) => {
  const { data: me } = useMeQuery();
  const {
    data: titlePlaces,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['title-places', { ...data, lang: me?.lang }],
    queryFn: () => getTitlePlaces({ ...data }),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
    retry: 0,
    cacheTime: 0,
    enabled: !!me,
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { titlePlaces, isLoading, refetch };
};
