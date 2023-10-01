import Head from 'next/head';
import { PasswordResets } from '@/modules/auth-modules/forgot-password-module';

const PasswordResetsPage = () => {
  return (
    <>
      <Head>
        <title>Forgot Password | Minsk</title>
      </Head>
      <PasswordResets />
    </>
  );
};

export default PasswordResetsPage;
