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
import { nameLogo } from '@/common/constants';
import { SITE_PREGENERATED_ARTICLES_COUNT } from '@/modules/articles-module/constants/articles-constants';

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
        <title>{`${post.title} | ${nameLogo}`}</title>
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

export const getStaticPaths: GetStaticPaths = async (context) => {
  const fetchData = async (lang: string) => {
    const { data } = await getArticlesPublic({
      title: '',
      pageSize: SITE_PREGENERATED_ARTICLES_COUNT,
      pageNumber: 1,
      lang,
    });

    return { data, lang };
  };

  const [...allPosts] = await Promise.all(
    (context.locales || []).map((locale) => fetchData(locale))
  );

  const paths = allPosts.map((posts) => {
    return posts.data.items.map((post) => ({
      params: { slug: post.slug },
      locale: posts.lang,
    }));
  });

  return {
    paths: paths.flat(),
    fallback: 'blocking',
  };
};

export default ArticlePage;
