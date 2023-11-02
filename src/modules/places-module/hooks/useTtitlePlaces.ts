import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getTitlePlaces } from '@/modules/places-module/api/places-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { useMeQuery } from '@/services';

export const useTitlePlaces = (
  page: number,
  pageSize: number,
  name: string
) => {
  const { data: me } = useMeQuery();
  const {
    data: titlePlaces,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['title-places', { page, pageSize, name, lang: me?.lang }],
    queryFn: () => getTitlePlaces(page, pageSize, name),
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
