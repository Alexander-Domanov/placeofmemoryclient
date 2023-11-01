import { useMutation } from '@tanstack/react-query';
import { deleteAvatar } from '@/modules/account-modules/edit-profile-module';

export const useDeleteAvatar = () => {
  const { isLoading, mutate } = useMutation({
    mutationKey: ['me'],
    mutationFn: deleteAvatar,
  });

  return { isLoading, mutate };
};
