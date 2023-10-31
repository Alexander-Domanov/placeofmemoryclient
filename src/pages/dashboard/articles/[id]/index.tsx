import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import { ArticleEdit } from '@/modules/articles-module';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';

const DashboarArticleEdit: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Edit Article</title>
      </Head>

      <ArticleEdit />
    </>
  );
};

DashboarArticleEdit.getLayout = getDashboardLayout;

export default DashboarArticleEdit;
