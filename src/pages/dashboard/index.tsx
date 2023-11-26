import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Dashboard } from '@/modules/dashboard-module/components/dashboard';
import { useTranslation } from '@/components/internationalization';
import { nameLogo } from '@/common/constants';

const DashboardPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.indexTitle} | ${nameLogo}`}</title>
      </Head>

      <Dashboard />
    </>
  );
};

DashboardPage.getLayout = getDashboardLayout;

export default DashboardPage;
