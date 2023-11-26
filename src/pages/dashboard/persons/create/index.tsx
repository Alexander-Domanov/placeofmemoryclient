import Head from 'next/head';
import React from 'react';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { CreatePerson } from '@/modules/persons-module/components/CreatePerson';
import { useTranslation } from '@/components/internationalization';
import { nameLogo } from '@/common/constants';

const DashboardPersonCreate = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.persons.create.index} | ${nameLogo}`}</title>
      </Head>

      <CreatePerson />
    </>
  );
};

DashboardPersonCreate.getLayout = getDashboardLayout;

export default DashboardPersonCreate;
