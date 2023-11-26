import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Contacts } from '@/modules/contacts-module/components/contacts';
import { useTranslation } from '@/components/internationalization';
import { nameLogo } from '@/common/constants';

const DashboardContactsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.contacts.index} | ${nameLogo}`}</title>
      </Head>

      <Contacts />
    </>
  );
};

DashboardContactsPage.getLayout = getDashboardLayout;

export default DashboardContactsPage;
