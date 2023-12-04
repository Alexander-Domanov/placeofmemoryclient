import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { routes } from '@/common/routing/routes';
import { getPersonsPublic } from '@/modules/persons-module/api/persons-api';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const fetchPersons = async (lang: string) => {
    const { data } = await getPersonsPublic({
      pageSize: 1000,
      lang,
    });

    return { data, lang };
  };

  const [...allPersons] = await Promise.all(
    (context.locales || []).map((locale) => fetchPersons(locale))
  );

  const paths = allPersons.map((persons) => {
    return persons.data.items.map(
      (person) =>
        ({
          loc: routes.persons.personFullRoute(person.slug, persons.lang),
          lastmod: person.updatedAt,
          changefreq: 'daily',
          priority: 0.7,
        } as ISitemapField)
    );
  });

  return getServerSideSitemapLegacy(context, paths.flat());
};

export default function PersonsSitemap() {}
