import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import { Recovery } from '@/modules/auth-modules/new-password-recovery-module';
import { getLayoutWithHeader } from '@/components';

const PageRecovery: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Аднаўленне пароля | Mogilki</title>
      </Head>
      <Recovery />
    </div>
  );
};
PageRecovery.getLayout = getLayoutWithHeader;
export default PageRecovery;
