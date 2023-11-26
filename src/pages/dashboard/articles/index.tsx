import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { NextPageWithLayout } from '@/pages/_app';
import { Articles } from '@/modules/articles-module';
import { useTranslation } from '@/components/internationalization';
import { nameLogo } from '@/common/constants';

const DashboardArticlesPage: NextPageWithLayout = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.articles.index} | ${nameLogo}`}</title>
      </Head>

      <Articles />
    </>
  );
};

DashboardArticlesPage.getLayout = getDashboardLayout;

export default DashboardArticlesPage;
