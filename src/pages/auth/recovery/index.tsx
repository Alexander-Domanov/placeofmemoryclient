import Head from 'next/head';
import { Recovery } from '@/modules/auth-modules/new-password-recovery-module';
import { useTranslation } from '@/components/internationalization';

import { Header } from '@/components';

const PageRecovery = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{t.auth.recovery.indexTile} | Mogilki</title>
      </Head>

      <Header />
      <Recovery />
    </div>
  );
};
export default PageRecovery;
