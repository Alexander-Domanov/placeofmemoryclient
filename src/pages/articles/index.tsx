import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from '@/components/internationalization';
import { ArticlesMain } from '@/modules/articles-module/components/ArticlesMain';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getArticlesPublic } from '@/modules/articles-module/api/articles-api';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IContacts, IGetArticlesResponse } from '@/types';
import { SITE_ARTICLES_PER_PAGE } from '@/modules/articles-module/articles-constants';

interface Props {
  contacts: IContacts;
  posts: IGetArticlesResponse;
}

const ArticlesPage: NextPage<Props> = ({ contacts, posts }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t.articles.indexTitle} | MOGILKI`}</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <ArticlesMain posts={posts} />
      </SiteLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data: posts } = await getArticlesPublic(
    SITE_ARTICLES_PER_PAGE,
    1,
    context.locale?.toLowerCase()
  );

  const { data: contacts } = await getContacts();

  return {
    props: {
      posts,
      contacts,
    },
    revalidate: 30,
  };
};

export default ArticlesPage;
