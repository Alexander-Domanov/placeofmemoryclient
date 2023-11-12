import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGalleryFile } from '@/modules/gallery-module/api/gallery-api';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useDeleteGalleryFile = () => {
  const client = useQueryClient();

  const {
    mutateAsync: deleteGalleryFileMutateAsync,
    mutate,
    isLoading: isDeleting,
  } = useMutation({
    mutationKey: ['delete-gallery-file'],
    mutationFn: (id: string | undefined) => deleteGalleryFile(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['gallery'] });
    },
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });

  return { deleteGalleryFileMutateAsync, mutate, isDeleting };
};
