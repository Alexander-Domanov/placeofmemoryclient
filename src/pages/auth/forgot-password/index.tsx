import Head from 'next/head';
import { PasswordResets } from '@/modules/auth-modules/forgot-password-module';
import { Header } from '@/components';
import { useTranslation } from '@/components/internationalization';
import { nameLogo } from '@/common/constants';

const PasswordResetsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.auth.forgotPassword.indexTitle} | ${nameLogo}`}</title>
      </Head>

      <Header />

      <PasswordResets />
    </>
  );
};

export default PasswordResetsPage;
