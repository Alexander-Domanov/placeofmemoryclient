import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPlace } from '@/modules/places-module/api/places-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { useMeQuery } from '@/services';

export const usePlace = (id: string) => {
  const { data: me } = useMeQuery();
  const {
    data: place,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['place', { id, lang: me?.lang }],
    queryFn: () => getPlace(id),
    ...noRefetch,
    select: (response) => response.data,
    enabled: !!id && !!me,
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { place, isLoading, isSuccess, me };
};
