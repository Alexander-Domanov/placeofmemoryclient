import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import { ArticleCreate } from '@/modules/articles-module';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { useTranslation } from '@/components/internationalization';

const DashboardArticleCreate: NextPageWithLayout = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.articles.create.index} | MOGILKI`}</title>
      </Head>

      <ArticleCreate />
    </>
  );
};

DashboardArticleCreate.getLayout = getDashboardLayout;

export default DashboardArticleCreate;
