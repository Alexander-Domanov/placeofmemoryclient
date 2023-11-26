import Head from 'next/head';
import React from 'react';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { CreatePerson } from '@/modules/persons-module/components/CreatePerson';
import { useTranslation } from '@/components/internationalization';

const DashboardPersonCreate = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.persons.create.index} | MOGILKI`}</title>
      </Head>

      <CreatePerson />
    </>
  );
};

DashboardPersonCreate.getLayout = getDashboardLayout;

export default DashboardPersonCreate;
