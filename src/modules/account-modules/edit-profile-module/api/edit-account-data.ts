import { authInstance } from '@/services';

export const editAccountData = (payloadEditProfile: any) => {
  return authInstance.put<any>('users/profile', { ...payloadEditProfile });
};
