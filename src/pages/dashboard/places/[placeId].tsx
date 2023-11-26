import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { PlaceEdit } from '@/modules/places-module/components/PlaceEdit';
import { useTranslation } from '@/components/internationalization';

const DashboardEditPlace = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t.dashboard.places.edit.index} | MOGILKI`}</title>
      </Head>

      <PlaceEdit />
    </>
  );
};

DashboardEditPlace.getLayout = getDashboardLayout;
export default DashboardEditPlace;
