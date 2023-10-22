import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Gallery } from '@/modules/gallery-module';
import { NextPageWithLayout } from '@/pages/_app';

const DashboardGalleryPage: NextPageWithLayout = () => {
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
