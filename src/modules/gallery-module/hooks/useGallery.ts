import { useQuery } from '@tanstack/react-query';
import { getGallery } from '../api/gallery-api';
import { noRefetch } from '@/common/helpers/noRefetch';
import { useMeQuery } from '@/services';

export const useGallery = (
  page: number,
  pageSize: number,
  status = 'all',
  type = 'all'
) => {
  const { data: me } = useMeQuery();

  const {
    data: gallery,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['gallery', { page, pageSize, status, type }],
    queryFn: () => getGallery(page, pageSize, status, type),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
  });

  return { gallery, isLoading, isFetching, isSuccess, refetch, me };
};
