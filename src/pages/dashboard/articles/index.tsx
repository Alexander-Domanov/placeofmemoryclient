import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { NextPageWithLayout } from '@/pages/_app';
import { Articles } from '@/modules/articles-module';
import { useTranslation } from '@/components/internationalization';

const DashboardArticlesPage: NextPageWithLayout = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.articles.index} | MOGILKI`}</title>
      </Head>

      <Articles />
    </>
  );
};

DashboardArticlesPage.getLayout = getDashboardLayout;

export default DashboardArticlesPage;
