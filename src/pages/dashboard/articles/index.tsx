import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { NextPageWithLayout } from '@/pages/_app';
import { Articles } from '@/modules/articles-module';

const DashboardArticlesPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Articles</title>
      </Head>

      <Articles />
    </>
  );
};

DashboardArticlesPage.getLayout = getDashboardLayout;

export default DashboardArticlesPage;
