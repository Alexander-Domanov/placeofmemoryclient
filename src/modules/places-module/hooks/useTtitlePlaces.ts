import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getTitlePlaces } from '@/modules/places-module/api/places-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useTitlePlaces = (
  page: number,
  pageSize: number,
  name: string
) => {
  const {
    data: titlePlaces,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['title-places', { page, pageSize, name }],
    queryFn: () => getTitlePlaces(page, pageSize, name),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
    retry: 0,
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { titlePlaces, isLoading, refetch };
};
