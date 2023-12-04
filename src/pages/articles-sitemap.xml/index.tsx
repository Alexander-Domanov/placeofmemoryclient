import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { getArticlesPublic } from '@/modules/articles-module/api/articles-api';
import { routes } from '@/common/routing/routes';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const fetchPosts = async (lang: string) => {
    const { data } = await getArticlesPublic({
      title: '',
      pageSize: 1000,
      lang,
    });

    return { data, lang };
  };

  const [...allPosts] = await Promise.all(
    (context.locales || []).map((locale) => fetchPosts(locale))
  );

  const paths = allPosts.map((posts) => {
    return posts.data.items.map(
      (post) =>
        ({
          loc: routes.articles.articleFullRoute(post.slug, posts.lang),
          lastmod: post.updatedAt,
          changefreq: 'daily',
          priority: 0.7,
        } as ISitemapField)
    );
  });

  return getServerSideSitemapLegacy(context, paths.flat());
};

export default function PostsSitemap() {}
