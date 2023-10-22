import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
    </>
  );
};

DashboardPage.getLayout = getDashboardLayout;

export default DashboardPage;
