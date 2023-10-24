import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Places } from '@/modules/places-module/components/Places';

const DashboardPlacesPage = () => {
  return (
    <>
      <Head>
        <title>Places</title>
      </Head>

      <Places />
    </>
  );
};

DashboardPlacesPage.getLayout = getDashboardLayout;

export default DashboardPlacesPage;
