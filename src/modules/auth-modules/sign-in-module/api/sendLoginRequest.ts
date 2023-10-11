import { authInstance } from '@/services';
import { ILoginResponse } from '@/types';
import { FormData } from '@/modules/auth-modules/sign-in-module';

export const sendLoginRequest = ({
  email,
  password,
}: Omit<FormData, 'login'>) => {
  return authInstance.post<ILoginResponse>('auth/login', { email, password });
};
