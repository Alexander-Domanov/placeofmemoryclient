import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendLoginRequest } from '@/modules/auth-modules/sign-in-module';

interface ILoginMutation {
  onSuccess: () => void;
  setCustomError: () => void;
  reset: () => void;
}

export const useLogin = (
  onSuccess: ILoginMutation['onSuccess'],
  setCustomError: ILoginMutation['setCustomError'],
  reset: ILoginMutation['reset']
) => {
  const client = useQueryClient();

  const {
    data,
    isLoading,
    isSuccess,
    variables,
    mutate: sendLoginData,
  } = useMutation({
    mutationFn: sendLoginRequest,
    mutationKey: ['login'],
    onSuccess: (data) => {
      const { accessToken } = data.data;

      localStorage.setItem('accessToken', accessToken);
      onSuccess();
      reset();

      client.invalidateQueries(['me']);
    },
    onError: () => {
      setCustomError();
    },
  });

  return {
    data,
    sendLoginData,
    variables,
    isLoading,
  };
};
