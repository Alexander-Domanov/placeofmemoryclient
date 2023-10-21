import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { ChooseGalleryFiles } from '@/modules/gallery-module';

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <ChooseGalleryFiles />
    </>
  );
};

DashboardPage.getLayout = getDashboardLayout;

export default DashboardPage;
