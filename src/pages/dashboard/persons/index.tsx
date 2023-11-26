import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Persons } from '@/modules/persons-module/components/Persons';
import { useTranslation } from '@/components/internationalization';

const DashboardPersonPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.persons.index} | MOGILKI`}</title>
      </Head>

      <Persons />
    </>
  );
};

DashboardPersonPage.getLayout = getDashboardLayout;

export default DashboardPersonPage;
