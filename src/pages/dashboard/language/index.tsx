import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Languages } from '@/modules/language-module';
import { useTranslation } from '@/components/internationalization';

const LanguagePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.languages.index} | MOGILKI`}</title>
      </Head>

      <Languages />
    </>
  );
};

LanguagePage.getLayout = getDashboardLayout;

export default LanguagePage;
