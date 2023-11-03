import { useMutation } from '@tanstack/react-query';
import { deleteAvatar } from '@/modules/account-modules/edit-profile-module';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useDeleteAvatar = () => {
  const { isLoading, mutate } = useMutation({
    mutationKey: ['me'],
    mutationFn: deleteAvatar,
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
  });

  return { isLoading, mutate };
};
