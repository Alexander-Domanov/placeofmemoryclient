import Head from 'next/head';
import { SignIn } from '@/modules/auth-modules/sign-in-module';

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign In | Minsk</title>
      </Head>
      <SignIn />
    </>
  );
};

export default SignInPage;
