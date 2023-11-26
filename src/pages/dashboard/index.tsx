import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Dashboard } from '@/modules/dashboard-module/components/dashboard';
import { useTranslation } from '@/components/internationalization';

const DashboardPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.indexTitle} | MOGILKI`}</title>
      </Head>

      <Dashboard />
    </>
  );
};

DashboardPage.getLayout = getDashboardLayout;

export default DashboardPage;
