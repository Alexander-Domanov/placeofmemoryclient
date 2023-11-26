import Head from 'next/head';
import { SignIn } from '@/modules/auth-modules/sign-in-module';
import { useTranslation } from '@/components/internationalization';
import { Header } from '@/components';
import { nameLogo } from '@/common/constants';

const SignInPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.auth.signIn.indexTitle} | ${nameLogo}`}</title>
      </Head>

      <Header />

      <SignIn />
    </>
  );
};
export default SignInPage;
