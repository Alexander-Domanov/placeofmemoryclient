import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Languages } from '@/modules/language-module';

const LanguagePage = () => {
  return (
    <>
      <Head>
        <title>Language</title>
      </Head>

      <Languages />
    </>
  );
};

LanguagePage.getLayout = getDashboardLayout;

export default LanguagePage;
