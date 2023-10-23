import Head from 'next/head';
import { getGlobalLayout } from '@/components';

const People = () => {
  return (
    <>
      <Head>
        <title>People | MOGILKI</title>
      </Head>
      <div className="flex justify-center items-center ">Людзі</div>
    </>
  );
};

People.getLayout = getGlobalLayout;

export default People;
