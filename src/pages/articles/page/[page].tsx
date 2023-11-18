import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import { useTranslation } from '@/components/internationalization';
import { ArticlesMain } from '@/modules/articles-module/components/ArticlesMain';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getArticlesPublic } from '@/modules/articles-module/api/articles-api';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IContacts, IGetArticlesResponse } from '@/types';
import { SITE_ARTICLES_PER_PAGE } from '@/modules/articles-module/articles-constants';
import { generateArray } from '@/common/helpers/generateArray';
import { routes } from '@/common/routing/routes';

interface Props {
  contacts: IContacts;
  posts: IGetArticlesResponse;
}

const Articles: FC<Props> = ({ contacts, posts }) => {
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
  const page = context.params?.page as string;

  if (page === '1') {
    return {
      redirect: {
        destination: routes.articles.index,
        locale: context.locale,
        permanent: false,
      },
    };
  }

  const { data: posts } = await getArticlesPublic(
    SITE_ARTICLES_PER_PAGE,
    +page,
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: postsBy } = await getArticlesPublic(SITE_ARTICLES_PER_PAGE);

  const pathsBy = generateArray(2, postsBy.pagesCount).map((page) => ({
    params: { page: `${page}` },
    locale: 'by',
  }));

  const pathsRu = generateArray(2, postsBy.pagesCount).map((page) => ({
    params: { page: `${page}` },
    locale: 'ru',
  }));

  return {
    paths: [...pathsBy, ...pathsRu],
    fallback: 'blocking',
  };
};

export default Articles;
