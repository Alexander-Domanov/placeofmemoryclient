import { useQuery } from '@tanstack/react-query';
import { getGallery } from '../api/gallery-api';
import { noRefetch } from '@/common/helpers/noRefetch';

export const useGallery = (page: number) => {
  const { data: gallery, isLoading } = useQuery({
    queryKey: ['gallery', { page }],
    queryFn: () => getGallery(page),
    ...noRefetch,
  });

  return { gallery, isLoading };
};
