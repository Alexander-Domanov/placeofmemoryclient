import Head from 'next/head';
import { SignUp } from '@/modules/auth-modules/sign-up-module';

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up | Minsk</title>
      </Head>
      <SignUp />
    </>
  );
};

export default SignUpPage;
