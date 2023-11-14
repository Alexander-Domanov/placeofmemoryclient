import Head from 'next/head';
import { SignIn } from '@/modules/auth-modules/sign-in-module';
import { getLayoutWithHeader } from '@/components';
import { useTranslation } from '@/components/internationalization';

const SignInPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.auth.signIn.indexTitle} | Mogilki</title>
      </Head>
      <SignIn />
    </>
  );
};
SignInPage.getLayout = getLayoutWithHeader;
export default SignInPage;
