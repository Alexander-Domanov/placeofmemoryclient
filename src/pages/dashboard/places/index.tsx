import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Places } from '@/modules/places-module/components/Places';

const DashboardGalleryPage = () => {
  return (
    <>
      <Head>
        <title>Places</title>
      </Head>
      <Places />
    </>
  );
};

DashboardGalleryPage.getLayout = getDashboardLayout;

export default DashboardGalleryPage;
