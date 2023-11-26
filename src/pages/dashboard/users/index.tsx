import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Users } from '@/modules/users-module/components/Users';
import { useTranslation } from '@/components/internationalization';
import { nameLogo } from '@/common/constants';

const DashboardGalleryPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.users.indexH} | ${nameLogo}`}</title>
      </Head>

      <Users />
    </>
  );
};

DashboardGalleryPage.getLayout = getDashboardLayout;

export default DashboardGalleryPage;
