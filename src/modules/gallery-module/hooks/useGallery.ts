import { useQuery } from '@tanstack/react-query';
import { getGallery } from '../api/gallery-api';
import { noRefetch } from '@/common/helpers/noRefetch';

export const useGallery = (page: number, pageSize: number) => {
  const { data: gallery, isLoading } = useQuery({
    queryKey: ['gallery', { page, pageSize }],
    queryFn: () => getGallery(page, pageSize),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
  });

  return { gallery, isLoading };
};
