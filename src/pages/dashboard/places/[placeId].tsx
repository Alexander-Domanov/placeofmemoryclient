import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { PlaceEdit } from '@/modules/places-module/components/PlaceEdit';
import { useTranslation } from '@/components/internationalization';
import { nameLogo } from '@/common/constants';

const DashboardEditPlace = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t.dashboard.places.edit.index} | ${nameLogo}`}</title>
      </Head>

      <PlaceEdit />
    </>
  );
};

DashboardEditPlace.getLayout = getDashboardLayout;
export default DashboardEditPlace;
