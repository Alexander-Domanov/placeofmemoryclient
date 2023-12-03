import { useMutation } from '@tanstack/react-query';
import { sendVerificationLink } from '@/modules/auth-modules/resend-verification-form/api/sendVerificationLink';
import { routes } from '@/common/routing/routes';
import { ResponseError } from '@/modules/account-modules/edit-profile-module';

interface VerifyType {
  reset: () => void;
  push: (path: string) => void;
  setError: (name: string, message: string) => void;
}

export const useSendVerifyEmail = (
  setError: VerifyType['setError'],
  reset: VerifyType['reset'],
  push: VerifyType['push']
) => {
  const { isLoading, mutate: resendVerification } = useMutation({
    mutationFn: sendVerificationLink,
    onSuccess: () => {
      reset();
      push(routes.auth.signIn);
    },
    onError: (error: ResponseError) => {
      const message = error?.response?.data?.messages;

      // @ts-ignore
      message?.forEach(({ message, field }) => {
        setError(field, message);
      });
    },
  });

  return {
    isLoading,
    resendVerification,
  };
};
