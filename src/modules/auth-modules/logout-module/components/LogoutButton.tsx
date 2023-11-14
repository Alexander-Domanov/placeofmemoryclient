import { FC } from 'react';

import { useLogout } from '@/modules/auth-modules/logout-module';
import { useTranslation } from '@/components/internationalization';

export const LogoutButton: FC = () => {
  const { sendLogout } = useLogout();
  const { t } = useTranslation();
  const handleLogout = () => {
    sendLogout();
  };

  return (
    <>
      <button onClick={() => handleLogout()}>
        <span>{t.header.logout}</span>
      </button>
    </>
  );
};
