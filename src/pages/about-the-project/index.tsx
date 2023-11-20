import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useTranslation } from '@/components/internationalization';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';

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
export const getStaticProps: GetStaticProps = async () => {
  const { data: contacts } = await getContacts();

  return {
    props: {
      contacts,
    },
    revalidate: 30,
  };
};

export default AboutTheProject;
