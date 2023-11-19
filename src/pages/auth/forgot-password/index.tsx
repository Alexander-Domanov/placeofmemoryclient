import Head from 'next/head';
import { PasswordResets } from '@/modules/auth-modules/forgot-password-module';
import { Header } from '@/components';
import { useTranslation } from '@/components/internationalization';

const PasswordResetsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.auth.forgotPassword.indexTitle}| Mogilki</title>
      </Head>

      <Header />

      <PasswordResets />
    </>
  );
};
// PasswordResetsPage.getLayout = getLayoutWithHeader;
export default PasswordResetsPage;
