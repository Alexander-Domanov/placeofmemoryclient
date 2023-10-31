import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { PlaceEdit } from '@/modules/places-module/components/PlaceEdit';

const DashboardEditPlace = () => {
  return (
    <>
      <Head>
        <title>Edit Place</title>
      </Head>

      <PlaceEdit />
    </>
  );
};

DashboardEditPlace.getLayout = getDashboardLayout;
export default DashboardEditPlace;
