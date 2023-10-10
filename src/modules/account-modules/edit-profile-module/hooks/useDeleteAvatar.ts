import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAvatar } from '@/modules/account-modules/edit-profile-module';

export const useDeleteAvatar = () => {
  const client = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationKey: ['avatar-delete'],
    mutationFn: deleteAvatar,
    onSuccess: () => {
      client.invalidateQueries(['me']);
    },
  });

  return { isLoading, mutate };
};
