import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import { Recovery } from '@/modules/auth-modules/new-password-recovery-module';
import { getLayoutWithHeader } from '@/components';
import { useTranslation } from '@/components/internationalization';

const PageRecovery: NextPageWithLayout = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{t.auth.recovery.indexTile} | Mogilki</title>
      </Head>
      <Recovery />
    </div>
  );
};
PageRecovery.getLayout = getLayoutWithHeader;
export default PageRecovery;
