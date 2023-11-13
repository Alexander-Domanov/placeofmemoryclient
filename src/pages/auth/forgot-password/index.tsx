import Head from 'next/head';
import { PasswordResets } from '@/modules/auth-modules/forgot-password-module';
import { getLayoutWithHeader } from '@/components';

const PasswordResetsPage = () => {
  return (
    <>
      <Head>
        <title>Забыліся на пароль | Mogilki</title>
      </Head>
      <PasswordResets />
    </>
  );
};
PasswordResetsPage.getLayout = getLayoutWithHeader;
export default PasswordResetsPage;
