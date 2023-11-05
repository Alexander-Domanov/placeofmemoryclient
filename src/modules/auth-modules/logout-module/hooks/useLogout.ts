import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { sendLogoutRequest } from '@/modules/auth-modules/logout-module';
import { routes } from '@/common/routing/routes';

export const useLogout = () => {
  const client = useQueryClient();
  const { push } = useRouter();
  const routeChange = async () => push(routes.main);
  const {
    isLoading,
    mutate: sendLogout,
    isSuccess,
    mutateAsync: sendLogoutAsync,
  } = useMutation({
    mutationFn: sendLogoutRequest,
    mutationKey: ['logout'],
    onSuccess: () => {
      window.localStorage.removeItem('accessToken');
      routeChange();
      client.invalidateQueries(['me']);
    },
    onError: () => {
      window.localStorage.removeItem('accessToken');
      routeChange();
      client.invalidateQueries(['me']);
    },
  });

  return { isLoading, sendLogout, isSuccess, sendLogoutAsync };
};
