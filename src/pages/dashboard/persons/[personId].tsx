import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { PersonEdit } from '@/modules/persons-module/components/PersonEdit';

const DashboardPersonList = () => {
  return (
    <>
      <Head>
        <title>Edit person</title>
      </Head>

      <PersonEdit />
    </>
  );
};

DashboardPersonList.getLayout = getDashboardLayout;
export default DashboardPersonList;
