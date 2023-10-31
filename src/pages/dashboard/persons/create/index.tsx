import Head from 'next/head';
import React from 'react';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { CreatePerson } from '@/modules/persons-module/components/CreatePerson';

const DashboardPersonCreate = () => {
  return (
    <>
      <Head>
        <title>Create Person</title>
      </Head>

      <CreatePerson />
    </>
  );
};

DashboardPersonCreate.getLayout = getDashboardLayout;

export default DashboardPersonCreate;
