import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Dashboard } from '@/modules/dashboard-module/components/dashboard';

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Dashboard />
    </>
  );
};

DashboardPage.getLayout = getDashboardLayout;

export default DashboardPage;
