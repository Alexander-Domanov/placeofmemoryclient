import Head from 'next/head';
import { SignUp } from '@/modules/auth-modules/sign-up-module';
import { getLayoutWithHeader } from '@/components';

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Зарэгістравацца| Mogilki</title>
      </Head>
      <SignUp />
    </>
  );
};

SignUpPage.getLayout = getLayoutWithHeader;
export default SignUpPage;
