import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import { ArticleCreate } from '@/modules/articles-module';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';

const DashboardArticleCreate: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Article</title>
      </Head>

      <ArticleCreate />
    </>
  );
};

DashboardArticleCreate.getLayout = getDashboardLayout;

export default DashboardArticleCreate;
