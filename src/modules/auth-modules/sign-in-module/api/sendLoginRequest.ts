import { authInstance } from '@/services';
import { ILoginResponse } from '@/types';

export const sendLoginRequest = ({ email, password, lang }: any) => {
  return authInstance.post<ILoginResponse>('auth/login', {
    email,
    password,
    lang,
  });
};
