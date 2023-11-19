import Head from 'next/head';
import { SignIn } from '@/modules/auth-modules/sign-in-module';
import { useTranslation } from '@/components/internationalization';
import { Header } from '@/components';

const SignInPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.auth.signIn.indexTitle} | Mogilki</title>
      </Head>

      <Header />

      <SignIn />
    </>
  );
};
// SignInPage.getLayout = getLayoutWithHeader;
export default SignInPage;
