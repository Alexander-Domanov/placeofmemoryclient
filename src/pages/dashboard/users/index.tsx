import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Users } from '@/modules/users-module/components/Users';

const DashboardGalleryPage = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Users />
    </>
  );
};

DashboardGalleryPage.getLayout = getDashboardLayout;

export default DashboardGalleryPage;
