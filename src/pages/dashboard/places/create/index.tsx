import Head from 'next/head';
import React from 'react';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { AddPlacePage } from '@/modules/places-modules/components/AddPlace';

const DashboardGalleryPage = () => {
  return (
    <>
      <Head>
        <title>Add Place</title>
      </Head>
      <AddPlacePage />
    </>
  );
};

DashboardGalleryPage.getLayout = getDashboardLayout;

export default DashboardGalleryPage;
