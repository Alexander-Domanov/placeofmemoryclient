import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import { Articles } from '@/modules/articles-module';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';

const DashboarArticleEdit: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Articles</title>
      </Head>

      <Articles />
    </>
  );
};

DashboarArticleEdit.getLayout = getDashboardLayout;

export default DashboarArticleEdit;
