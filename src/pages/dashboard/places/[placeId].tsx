import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { PlacePage } from '@/modules/places-module/components/Place';

const DashboardPlaceList = () => {
  return (
    <>
      <Head>
        <title>Place List</title>
      </Head>

      <PlacePage />
    </>
  );
};

DashboardPlaceList.getLayout = getDashboardLayout;
export default DashboardPlaceList;
