import { useMutation } from '@tanstack/react-query';
import { passwordRecoveryAPI } from '@/services';
import { ResponseError } from '@/types/response-error-message-type';

interface ForgotPasswordType {
  onSuccess: () => void;
  setError: (name: string, message: string) => void;
}
export const useForgotPassword = (
  onSuccess: ForgotPasswordType['onSuccess'],
  setError: ForgotPasswordType['setError']
) => {
  const {
    isLoading,
    mutate: sendLinkPasswordRecovery,
    variables,
  } = useMutation({
    mutationKey: ['password-recovery'],
    mutationFn: passwordRecoveryAPI.passwordRecoveryWithRecaptcha,
    onSuccess: (data) => {
      if (data) {
        onSuccess();
      } else {
        setError('email', 'user is not found');
      }
    },
    onError: (error: ResponseError) => {
      if (error.response.data) {
        const { message } = error.response.data.messages[0];

        setError('email', message);
      }
    },
  });

  return { isLoading, sendLinkPasswordRecovery, variables };
};
