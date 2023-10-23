import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPlace } from '@/modules/places-modules/api/places-api';

export const usePlace = (id: string | undefined | string[]) => {
  const {
    data: place,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['place', { id }],
    queryFn: () => getPlace(id),
    enabled: !!id,
    select: (response) => response.data,
    ...noRefetch,
  });

  return { place, isLoading, isSuccess };
};
