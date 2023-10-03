import { authInstance } from '@/services';
import { LoginResponse } from '@/types';
import { FormData } from '@/modules/auth-modules/sign-in-module';

export const sendLoginRequest = ({
  email,
  password,
}: Omit<FormData, 'login'>) => {
  return authInstance.post<LoginResponse>('auth/login', { email, password });
};
