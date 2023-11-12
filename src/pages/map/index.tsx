import Head from 'next/head';
import { getGlobalLayout } from '@/components';
import { MapsMain } from '@/modules/maps-module/components/maps';

const Map = () => {
  return (
    <>
      <Head>
        <title>МАПА | MOGILKI</title>
      </Head>

      <MapsMain />
    </>
  );
};

Map.getLayout = getGlobalLayout;

export default Map;
