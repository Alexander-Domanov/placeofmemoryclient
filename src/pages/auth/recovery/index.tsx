import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import { Recovery } from '@/modules/auth-modules/recovery-module';

const PageRecovery: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Password recovery</title>
      </Head>
      <Recovery />
    </div>
  );
};
export default PageRecovery;
