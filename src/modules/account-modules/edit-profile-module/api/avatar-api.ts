import { authInstance } from '@/services';
import { AvatarType } from '@/types';

export const sendAvatar = async (formData: FormData) => {
  const res = await authInstance.post<AvatarType>(
    'users/profile/avatar',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return res.data;
};

export const deleteAvatar = () => {
  return authInstance.delete('users/profile/avatar');
};
