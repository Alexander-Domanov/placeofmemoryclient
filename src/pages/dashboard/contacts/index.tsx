import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Contacts } from '@/modules/contacts-module/components/contacts';
import { useTranslation } from '@/components/internationalization';

const DashboardContactsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.contacts.index} | MOGILKI`}</title>
      </Head>

      <Contacts />
    </>
  );
};

DashboardContactsPage.getLayout = getDashboardLayout;

export default DashboardContactsPage;
