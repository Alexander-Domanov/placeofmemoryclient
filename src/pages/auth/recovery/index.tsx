import Head from 'next/head';
import { Recovery } from '@/modules/auth-modules/new-password-recovery-module';
import { useTranslation } from '@/components/internationalization';

import { Header } from '@/components';
import { nameLogo } from '@/common/constants';

const PageRecovery = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{`${t.auth.recovery.indexTile} | ${nameLogo}`}</title>
      </Head>

      <Header />
      <Recovery />
    </div>
  );
};
export default PageRecovery;
