import { authInstance } from '@/services/api/instanse';

export const sendVerificationLink = ({ email, lang }: any) => {
  return authInstance.post('auth/registration-email-resending', {
    email,
    lang,
  });
};
