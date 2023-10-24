import Head from 'next/head';
import React from 'react';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { AddPlacePage } from '@/modules/places-module/components/AddPlace';

const DashboardPlaceCreate = () => {
  return (
    <>
      <Head>
        <title>Create Place</title>
      </Head>

      <AddPlacePage />
    </>
  );
};

DashboardPlaceCreate.getLayout = getDashboardLayout;

export default DashboardPlaceCreate;
