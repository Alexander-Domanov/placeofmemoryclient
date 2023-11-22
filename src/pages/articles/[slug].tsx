import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { ArticleMain } from '@/modules/articles-module/components/ArticleMain';
import {
  getArticlePublic,
  getArticlesPublic,
} from '@/modules/articles-module/api/articles-api';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IArticle, IContacts } from '@/types';
import Error from '@/pages/_error';

interface Props {
  post: IArticle;
  contacts: IContacts;
  statusCode?: any;
}

const ArticlePage: NextPage<Props> = ({ contacts, post, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }
  return (
    <>
      <Head>
        <title>{`${post.title} | MOGILKI`}</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <ArticleMain post={post} />
      </SiteLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = context.params?.slug as string;

    const { data: post } = await getArticlePublic(slug, context.locale);

    const { data: contacts } = await getContacts();

    return {
      props: {
        post,
        contacts,
      },
      revalidate: 30,
    };
  } catch (error: any) {
    return {
      props: {
        statusCode: error.response?.status || 500,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: postsBy } = await getArticlesPublic({
    title: '',
    pageSize: 20,
    pageNumber: 1,
    lang: 'by',
  });
  const { data: postsRu } = await getArticlesPublic({
    title: '',
    pageSize: 20,
    pageNumber: 1,
    lang: 'ru',
  });

  const pathsBy = postsBy.items.map((post) => ({
    params: { slug: post.slug },
    locale: 'by',
  }));

  const pathsRu = postsRu.items.map((post) => ({
    params: { slug: post.slug },
    locale: 'ru',
  }));

  return {
    paths: [...pathsBy, ...pathsRu],
    fallback: 'blocking',
  };
};

export default ArticlePage;
