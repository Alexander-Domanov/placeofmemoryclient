import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Persons } from '@/modules/persons-module/components/Persons';

const DashboardPersonPage = () => {
  return (
    <>
      <Head>
        <title>Persons</title>
      </Head>

      <Persons />
    </>
  );
};

DashboardPersonPage.getLayout = getDashboardLayout;

export default DashboardPersonPage;
