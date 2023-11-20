import { authInstance } from '@/services';
import { ILoginResponse } from '@/types';

export const sendLoginRequest = ({ email, password }: any) => {
  return authInstance.post<ILoginResponse>('auth/login', { email, password });
};
