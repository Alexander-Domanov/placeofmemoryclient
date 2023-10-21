import { useQuery } from '@tanstack/react-query';
import { getGallery } from '../api/gallery-api';
import { noRefetch } from '@/common/helpers/noRefetch';

export const useGallery = (page: number, pageSize: number, status = 'all') => {
  const {
    data: gallery,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['gallery', { page, pageSize, status }],
    queryFn: () => getGallery(page, pageSize, status),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
  });

  return { gallery, isLoading, isFetching, isSuccess, refetch };
};
