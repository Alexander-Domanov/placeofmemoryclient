import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';

const PlaceList = () => {
  return (
    <>
      <Head>
        <title>Place List</title>
      </Head>
    </>
  );
};

PlaceList.getLayout = getDashboardLayout;
export default PlaceList;
