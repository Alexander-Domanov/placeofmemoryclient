import Head from 'next/head';
import { Recovery } from '@/modules/auth-modules/new-password-recovery-module';
import { useTranslation } from '@/components/internationalization';

import { Header } from '@/components';

const PageRecovery = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{`${t.auth.recovery.indexTile} | MOGILKI`}</title>
      </Head>

      <Header />
      <Recovery />
    </div>
  );
};
export default PageRecovery;
