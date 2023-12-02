import { authInstance } from '@/services';

export const sendRegisterRequest = ({
  email,
  password,
  userName,
  lang,
}: {
  email: string;
  password: number;
  userName: string;
  lang: string;
}) => {
  return authInstance.post('auth/registration', {
    userName,
    email,
    password,
    lang,
  });
};
