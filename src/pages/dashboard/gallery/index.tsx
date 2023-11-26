import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Gallery } from '@/modules/gallery-module';
import { NextPageWithLayout } from '@/pages/_app';
import { useTranslation } from '@/components/internationalization';

const DashboardGalleryPage: NextPageWithLayout = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.gallery.title} | MOGILKI`}</title>
      </Head>

      <Gallery />
    </>
  );
};

DashboardGalleryPage.getLayout = getDashboardLayout;

export default DashboardGalleryPage;
