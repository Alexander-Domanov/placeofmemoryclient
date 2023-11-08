import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Contacts } from '@/modules/contacts-module/components/contacts';

const DashboardContactsPage = () => {
  return (
    <>
      <Head>
        <title>Contacts</title>
      </Head>

      <Contacts />
    </>
  );
};

DashboardContactsPage.getLayout = getDashboardLayout;

export default DashboardContactsPage;
