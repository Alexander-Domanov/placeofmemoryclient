import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Persons } from '@/modules/persons-module/components/Persons';
import { useTranslation } from '@/components/internationalization';
import { nameLogo } from '@/common/constants';

const DashboardPersonPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.persons.index} | ${nameLogo}`}</title>
      </Head>

      <Persons />
    </>
  );
};

DashboardPersonPage.getLayout = getDashboardLayout;

export default DashboardPersonPage;
