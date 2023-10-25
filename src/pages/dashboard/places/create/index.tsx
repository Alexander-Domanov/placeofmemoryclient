import Head from 'next/head';
import React from 'react';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { CreatePlace } from '@/modules/places-module/components/CreatePlace';

const DashboardPlaceCreate = () => {
  return (
    <>
      <Head>
        <title>Create Place</title>
      </Head>

      <CreatePlace />
    </>
  );
};

DashboardPlaceCreate.getLayout = getDashboardLayout;

export default DashboardPlaceCreate;
