import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { PersonPage } from '@/modules/persons-module/components/Person';

const DashboardPersonList = () => {
  return (
    <>
      <Head>
        <title>Person List</title>
      </Head>

      <PersonPage />
    </>
  );
};

DashboardPersonList.getLayout = getDashboardLayout;
export default DashboardPersonList;
