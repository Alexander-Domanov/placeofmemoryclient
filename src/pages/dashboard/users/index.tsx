import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Users } from '@/modules/users-module/components/Users';
import { useTranslation } from '@/components/internationalization';

const DashboardGalleryPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.users.indexH} | MOGILKI`}</title>
      </Head>

      <Users />
    </>
  );
};

DashboardGalleryPage.getLayout = getDashboardLayout;

export default DashboardGalleryPage;
