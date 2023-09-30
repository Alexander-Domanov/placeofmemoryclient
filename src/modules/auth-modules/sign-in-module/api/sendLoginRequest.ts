import { authInstance } from '@/services';
import { ResLogin } from '@/types';
import { FormData } from '@/modules/auth-modules/sign-in-module';

export const sendLoginRequest = ({
  email,
  password,
}: Omit<FormData, 'login'>) => {
  return authInstance.post<ResLogin>('auth/login', { email, password });
};
