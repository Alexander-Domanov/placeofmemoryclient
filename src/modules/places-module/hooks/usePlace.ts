import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPlace } from '@/modules/places-module/api/places-api';

export const usePlace = (id: string) => {
  const {
    data: place,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['place', { id }],
    queryFn: () => getPlace(id),
    ...noRefetch,
    select: (response) => response.data,
    enabled: !!id,
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  return { place, isLoading, isSuccess };
};
