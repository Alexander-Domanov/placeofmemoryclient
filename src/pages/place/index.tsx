import Head from 'next/head';
import { getGlobalLayout } from '@/components';

const Place = () => {
  return (
    <>
      <Head>
        <title>МЕСЦА | MOGILKI</title>
      </Head>
      <div className="flex justify-center items-center ">МЕСЦА</div>
    </>
  );
};

Place.getLayout = getGlobalLayout;

export default Place;
