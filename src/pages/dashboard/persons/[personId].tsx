import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { PersonEdit } from '@/modules/persons-module/components/PersonEdit';
import { useTranslation } from '@/components/internationalization';
import { nameLogo } from '@/common/constants';

const DashboardPersonList = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.persons.edit.index} | ${nameLogo}`}</title>
      </Head>

      <PersonEdit />
    </>
  );
};

DashboardPersonList.getLayout = getDashboardLayout;
export default DashboardPersonList;
