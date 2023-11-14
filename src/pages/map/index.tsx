import Head from 'next/head';
import { getGlobalLayout } from '@/components';
import { MapsMain } from '@/modules/maps-module/components/maps';
import { useTranslation } from '@/components/internationalization';

const Map = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.map.indexTitle} | MOGILKI</title>
      </Head>

      <MapsMain />
    </>
  );
};

Map.getLayout = getGlobalLayout;

export default Map;
