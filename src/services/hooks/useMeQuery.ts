import { useQuery } from '@tanstack/react-query';
import { meSendRequest } from '@/services';
import { noRefetch } from '@/common/helpers/noRefetch';

export const useMeQuery = (
  saveUserId?: (userId: number | null) => void,
  setUserName?: (userName: string | null) => void,
  setUrlAvatar?: (urlAvatar: string | null) => void
) => {
  return useQuery({
    queryFn: meSendRequest,
    onSuccess: (data) => {
      if (saveUserId) {
        saveUserId(data.userId);
      }
      if (setUserName) {
        setUserName(data.userName);
      }
      if (setUrlAvatar) setUrlAvatar(data.urlAvatar);
    },
    onError: () => {
      if (saveUserId) {
        saveUserId(null);
      }
      if (setUserName) {
        setUserName(null);
      }
    },
    queryKey: ['me'],
    retry: false,
    staleTime: 300000,
    ...noRefetch,
  });
};
