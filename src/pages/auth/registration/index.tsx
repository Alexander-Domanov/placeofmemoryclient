import Head from 'next/head';
import { SignUp } from '@/modules/auth-modules/sign-up-module';
import { useTranslation } from '@/components/internationalization';
import { Header } from '@/components';

const SignUpPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.auth.signUp.indexTitle} | MOGILKI`}</title>
      </Head>

      <Header />

      <SignUp />
    </>
  );
};

export default SignUpPage;
