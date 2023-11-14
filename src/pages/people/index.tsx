import Head from 'next/head';
import { getGlobalLayout } from '@/components';
import { useTranslation } from '@/components/internationalization';

const People = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.people.indexTitle} | MOGILKI</title>
      </Head>
      <div className="flex justify-center items-center ">Людзі</div>
    </>
  );
};

People.getLayout = getGlobalLayout;

export default People;
