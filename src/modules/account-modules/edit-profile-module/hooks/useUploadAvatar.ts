import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendAvatar } from '@/modules/account-modules/edit-profile-module';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useUploadAvatar = () => {
  const client = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationKey: ['avatar-uploading'],
    mutationFn: sendAvatar,
    onSuccess: async () => {
      await client.invalidateQueries(['me']);
    },
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });

  return { isLoading, mutate };
};
