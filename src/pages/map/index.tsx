import Head from 'next/head';
import { getGlobalLayout } from '@/components';

const Map = () => {
  return (
    <>
      <Head>
        <title>МАПА | MOGILKI</title>
      </Head>
      <div className="flex justify-center items-center ">МАПА</div>
    </>
  );
};

Map.getLayout = getGlobalLayout;

export default Map;
