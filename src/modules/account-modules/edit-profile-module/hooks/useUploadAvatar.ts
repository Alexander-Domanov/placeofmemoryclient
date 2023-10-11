import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendAvatar } from '@/modules/account-modules/edit-profile-module';

export const useUploadAvatar = () => {
  const client = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationKey: ['avatar-uploading'],
    mutationFn: sendAvatar,
    onSuccess: async () => {
      await client.invalidateQueries(['me']);
    },
  });

  return { isLoading, mutate };
};
