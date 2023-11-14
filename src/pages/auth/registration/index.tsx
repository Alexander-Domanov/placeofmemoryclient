import Head from 'next/head';
import { SignUp } from '@/modules/auth-modules/sign-up-module';
import { getLayoutWithHeader } from '@/components';
import { useTranslation } from '@/components/internationalization';

const SignUpPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.auth.signUp.indexTitle}| Mogilki</title>
      </Head>
      <SignUp />
    </>
  );
};

SignUpPage.getLayout = getLayoutWithHeader;
export default SignUpPage;
