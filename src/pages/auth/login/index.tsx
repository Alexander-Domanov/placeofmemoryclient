import Head from 'next/head';
import { SignIn } from '@/modules/auth-modules/sign-in-module';
import { getLayoutWithHeader } from '@/components';

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Увайсці | Mogilki</title>
      </Head>
      <SignIn />
    </>
  );
};
SignInPage.getLayout = getLayoutWithHeader;
export default SignInPage;
