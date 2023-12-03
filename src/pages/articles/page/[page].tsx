import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import { useTranslation } from '@/components/internationalization';
import { ArticlesMain } from '@/modules/articles-module/components/ArticlesMain';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getArticlesPublic } from '@/modules/articles-module/api/articles-api';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IContacts, IGetArticlesResponse } from '@/types';
import { SITE_ARTICLES_PER_PAGE } from '@/modules/articles-module/constants/articles-constants';
import { generateArray } from '@/common/helpers/generateArray';
import { routes } from '@/common/routing/routes';
import { nameLogo } from '@/common/constants';

interface Props {
  contacts: IContacts;
  posts: IGetArticlesResponse;
}

const Articles: FC<Props> = ({ contacts, posts }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t.articles.indexTitle} | ${nameLogo}`}</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <ArticlesMain articles={posts} />
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

  const { data: posts } = await getArticlesPublic({
    title: '',
    pageSize: SITE_ARTICLES_PER_PAGE,
    pageNumber: +page,
    lang: context.locale?.toLowerCase(),
  });

  const { data: contacts } = await getContacts();

  return {
    props: {
      posts,
      contacts,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const fetchData = async (lang: string) => {
    const { data } = await getArticlesPublic({
      title: '',
      pageSize: SITE_ARTICLES_PER_PAGE,
      lang,
    });

    return { data, lang };
  };

  const [...allPosts] = await Promise.all(
    (context.locales || []).map((locale) => fetchData(locale))
  );

  const paths = allPosts.map((posts) => {
    return generateArray(2, posts.data.pagesCount).map((page) => ({
      params: { page: `${page}` },
      locale: posts.lang,
    }));
  });

  return {
    paths: paths.flat(),
    fallback: 'blocking',
  };
};

export default Articles;
