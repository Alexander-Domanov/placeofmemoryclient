import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { passwordRecoveryAPI } from '@/services';
import { IResponseError } from '@/types/response-error-message.type';

interface ForgotPasswordType {
  onSuccess: () => void;
  setError: (name: string, message: string) => void;
}
export const useForgotPassword = (
  onSuccess: ForgotPasswordType['onSuccess'],
  setError: ForgotPasswordType['setError']
) => {
  const { locale } = useRouter();
  const {
    isLoading,
    mutate: sendLinkPasswordRecovery,
    variables,
  } = useMutation({
    mutationKey: ['password-recovery', locale],
    mutationFn: passwordRecoveryAPI.passwordRecoveryWithRecaptcha,
    onSuccess: (data) => {
      if (data) {
        onSuccess();
      } else {
        setError('email', 'user is not found');
      }
    },
    onError: (error: IResponseError) => {
      if (error.response.data) {
        const { message } = error.response.data.messages[0];

        setError('email', message);
      }
    },
  });

  return { isLoading, sendLinkPasswordRecovery, variables };
};
