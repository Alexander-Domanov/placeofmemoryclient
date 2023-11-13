import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGalleryFile } from '@/modules/gallery-module/api/gallery-api';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { noRefetch } from '@/common/helpers/noRefetch';

export const useUpdateGalleryFile = (id: string | null) => {
  const client = useQueryClient();

  const {
    mutateAsync: updateGalleryFileMutateAsync,
    mutate,
    isLoading: isUpdating,
  } = useMutation({
    mutationKey: ['update-file'],
    mutationFn: (form: any) => updateGalleryFile(id, form),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['gallery-file', { id }] });
      client.invalidateQueries({ queryKey: ['gallery'] });
    },
    ...noRefetch,
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });

  return { updateGalleryFileMutateAsync, mutate, isUpdating };
};
