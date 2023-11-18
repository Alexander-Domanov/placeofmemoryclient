import { FC } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { ArticleMain } from '@/modules/articles-module/components/ArticleMain';
import {
  getArticlePublic,
  getArticlesPublic,
} from '@/modules/articles-module/api/articles-api';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IArticle, IContacts } from '@/types';

interface Props {
  post: IArticle;
  contacts: IContacts;
}

const Article: FC<Props> = ({ contacts, post }) => {
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
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: postsBy } = await getArticlesPublic(20);
  const { data: postsRu } = await getArticlesPublic(20, 'ru');

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

export default Article;
