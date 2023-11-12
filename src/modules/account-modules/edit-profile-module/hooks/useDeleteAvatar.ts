import { useMutation } from '@tanstack/react-query';
import { deleteAvatar } from '@/modules/account-modules/edit-profile-module';
import { IResponseError } from '@/types/response-error-message.type';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useDeleteAvatar = ({
  setUrlAvatar,
}: {
  setUrlAvatar: (avatar: string | null) => void;
}) => {
  const { isLoading, mutate } = useMutation({
    mutationKey: ['me'],
    mutationFn: deleteAvatar,
    onError: (error: IResponseError) => {
      ErrorNotification(error);
    },
    onSuccess: () => {
      setUrlAvatar(null);
    },
  });

  return { isLoading, mutate };
};
