import Head from 'next/head';
import { getGlobalLayout } from '@/components';

const AboutTheProject = () => {
  return (
    <>
      <Head>
        <title>ПРА ПРАЭКТ | MOGILKI</title>
      </Head>
      <div className="flex justify-center items-center ">Пра праэкт</div>
    </>
  );
};

AboutTheProject.getLayout = getGlobalLayout;

export default AboutTheProject;
