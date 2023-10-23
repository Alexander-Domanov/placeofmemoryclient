import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { PlacePage } from '@/modules/places-modules/components/Place';

const PlaceList = () => {
  return (
    <>
      <Head>
        <title>Place List</title>
      </Head>
      <PlacePage />
    </>
  );
};

PlaceList.getLayout = getDashboardLayout;
export default PlaceList;
