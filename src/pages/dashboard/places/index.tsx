import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Places } from '@/modules/places-module/components/Places';
import { useTranslation } from '@/components/internationalization';
import { nameLogo } from '@/common/constants';

const DashboardPlacesPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.places.index} | ${nameLogo}`}</title>
      </Head>

      <Places />
    </>
  );
};

DashboardPlacesPage.getLayout = getDashboardLayout;

export default DashboardPlacesPage;
