import { useQuery } from '@tanstack/react-query';
import { getGalleryFile } from '@/modules/gallery-module/api/gallery-api';
import { noRefetch } from '@/common/helpers/noRefetch';

export const useGalleryFile = (id: string | null) => {
  const {
    data: file,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['gallery-file', { id }],
    queryFn: () => getGalleryFile(id),
    enabled: !!id,
    select: (response) => response.data,
    ...noRefetch,
  });

  return { file, isLoading, isSuccess };
};
