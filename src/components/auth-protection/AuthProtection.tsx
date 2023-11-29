import { FC, memo, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMeQuery } from '@/services';
import { useUserStore } from '@/store/userStore';
import { routes } from '@/common/routing/routes';

const AuthProtection: FC<PropsWithChildren> = memo(({ children }) => {
  const { pathname, replace } = useRouter();
  const { setUserId, setUserName, setUrlAvatar, setLang } = useUserStore();

  const { isSuccess, isError, fetchStatus } = useMeQuery(
    (userId) => {
      setUserId(userId);
    },
    (userName) => {
      setUserName(userName);
    },
    (urlAvatar) => {
      setUrlAvatar(urlAvatar);
    },
    (lang) => {
      setLang(lang);
    }
  );

  useEffect(() => {
    if (isError && !routes.unProtectedPaths.includes(pathname)) {
      replace(routes.auth.signIn, undefined, { shallow: true });
    }
  }, [isSuccess, isError]);
  return (
    <>
      {/* {fetchStatus === 'fetching' && <div>Loading...</div>} */}
      {children}
    </>
  );
});

export default AuthProtection;
