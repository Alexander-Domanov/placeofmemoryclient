import Head from 'next/head';
import React from 'react';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { CreatePlace } from '@/modules/places-module/components/CreatePlace';
import { useTranslation } from '@/components/internationalization';
import { nameLogo } from '@/common/constants';

const DashboardPlaceCreate = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.places.create.index} | ${nameLogo}`}</title>
      </Head>

      <CreatePlace />
    </>
  );
};

DashboardPlaceCreate.getLayout = getDashboardLayout;

export default DashboardPlaceCreate;
