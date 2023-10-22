import Head from 'next/head';
import { getGlobalLayout } from '@/components';

const Articles = () => {
  return (
    <>
      <Head>
        <title>АРТЫКУЛЫ | MOGILKI</title>
      </Head>
      <div className="flex justify-center items-center ">Артыкулы</div>
    </>
  );
};

Articles.getLayout = getGlobalLayout;

export default Articles;
