import Head from 'next/head';
import { SignUp } from '@/modules/auth-modules/sign-up-module';
import { useTranslation } from '@/components/internationalization';
import { Header } from '@/components';
import { nameLogo } from '@/common/constants';

const SignUpPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.auth.signUp.indexTitle} | ${nameLogo}`}</title>
      </Head>

      <Header />

      <SignUp />
    </>
  );
};

export default SignUpPage;
