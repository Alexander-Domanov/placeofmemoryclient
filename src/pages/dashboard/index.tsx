import { Button } from 'antd';
import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Button>a12</Button>
    </>
  );
};

DashboardPage.getLayout = getDashboardLayout;

export default DashboardPage;
