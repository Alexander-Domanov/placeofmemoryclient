import Head from 'next/head';
import { getGlobalLayout } from '@/components';
import { useTranslation } from '@/components/internationalization';

const Articles = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.articles.indexTitle} | MOGILKI</title>
      </Head>
      <div className="flex justify-center items-center ">Артыкулы</div>
    </>
  );
};

Articles.getLayout = getGlobalLayout;

export default Articles;
