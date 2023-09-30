import { useMutation, useQueryClient } from 'react-query';
import { sendLoginRequest } from '@/modules/auth-modules/sign-in-module';

type LoginMutation = {
  // onSuccess: () => void;
  setCustomError: () => void;
  reset: () => void;
};

export const useLoginMutation = (
  // onSuccess: LoginMutation['onSuccess'],
  setCustomError: LoginMutation['setCustomError'],
  reset: LoginMutation['reset']
) => {
  const client = useQueryClient();

  const {
    data,
    isLoading,
    variables,
    mutate: sendLoginData,
  } = useMutation({
    mutationFn: sendLoginRequest,
    mutationKey: ['login'],
    onSuccess: (data) => {
      const { accessToken } = data.data;

      localStorage.setItem('accessToken', accessToken);
      // onSuccess();
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
