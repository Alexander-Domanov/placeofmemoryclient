import Head from 'next/head';
import { getGlobalLayout } from '@/components';
import { useTranslation } from '@/components/internationalization';

const AboutTheProject = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.aboutTheProject.indexTitle} | MOGILKI</title>
      </Head>
      <div className="flex justify-center items-center ">Пра праэкт</div>
    </>
  );
};

AboutTheProject.getLayout = getGlobalLayout;

export default AboutTheProject;
