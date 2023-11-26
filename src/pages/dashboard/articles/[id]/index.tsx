import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import { ArticleEdit } from '@/modules/articles-module';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { useTranslation } from '@/components/internationalization';

const DashboarArticleEdit: NextPageWithLayout = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.articles.edit.index} | MOGILKI`}</title>
      </Head>

      <ArticleEdit />
    </>
  );
};

DashboarArticleEdit.getLayout = getDashboardLayout;

export default DashboarArticleEdit;
