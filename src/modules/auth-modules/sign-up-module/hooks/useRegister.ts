import { useMutation } from '@tanstack/react-query';
import { sendRegisterRequest } from '@/modules/auth-modules/sign-up-module';
import { IResponseError } from '@/types/response-error-message.type';

interface RegisterType {
  reset: () => void;
  setError: (name: string, message: string) => void;
}

export const useRegister = (
  reset: RegisterType['reset'],
  setError: RegisterType['setError']
) => {
  const {
    data,
    isLoading,
    variables,
    isSuccess,
    mutate: sendRegisteredData,
  } = useMutation({
    mutationFn: sendRegisterRequest,
    onSuccess: () => {
      reset();
    },
    onError: (error: IResponseError) => {
      const message = error?.response?.data?.messages;

      message?.forEach(({ message, field }) => {
        setError(field, message);
      });
    },
  });

  return {
    data,
    sendRegisteredData,
    variables,
    isLoading,
    isSuccess,
  };
};
