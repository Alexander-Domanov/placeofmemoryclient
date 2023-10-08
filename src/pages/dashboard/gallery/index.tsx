import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Gallery } from '@/modules/gallery-module';

const DashboardGalleryPage = () => {
  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>
      <Gallery />
    </>
  );
};

DashboardGalleryPage.getLayout = getDashboardLayout;

export default DashboardGalleryPage;
