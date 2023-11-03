import { FC } from 'react';

import { useLogout } from '@/modules/auth-modules/logout-module';

export const LogoutButton: FC = () => {
  const { sendLogout } = useLogout();

  const handleLogout = () => {
    sendLogout();
  };

  return (
    <>
      <button onClick={() => handleLogout()}>
        <span>Выйсці</span>
      </button>
    </>
  );
};
