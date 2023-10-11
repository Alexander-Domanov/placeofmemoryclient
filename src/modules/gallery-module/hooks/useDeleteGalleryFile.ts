import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGalleryFile } from '@/modules/gallery-module/api/gallery-api';

export const useDeleteGalleryFile = () => {
  const client = useQueryClient();

  const { mutateAsync, isLoading: isDeleting } = useMutation({
    mutationKey: ['delete-gallery-file'],
    mutationFn: (id: string | undefined) => deleteGalleryFile(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['gallery'] });
    },
  });

  return { mutateAsync, isDeleting };
};