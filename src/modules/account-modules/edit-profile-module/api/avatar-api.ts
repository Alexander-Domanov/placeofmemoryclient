import { authInstance } from '@/services';
import { IAvatarVersions, IVersionsType } from '@/types';

export const sendAvatar = async (formData: FormData) => {
  const res = await authInstance.post<IVersionsType<IAvatarVersions>>(
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
