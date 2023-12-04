import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { routes } from '@/common/routing/routes';
import { getPlacesMain } from '@/services';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const fetchPlaces = async (lang: string) => {
    const data = await getPlacesMain({
      pageSize: 1000,
      lang,
    });

    return { data, lang };
  };

  const [...allPlaces] = await Promise.all(
    (context.locales || []).map((locale) => fetchPlaces(locale))
  );

  const paths = allPlaces.map((places) => {
    return places.data.items.map(
      (place) =>
        ({
          loc: routes.places.placeFullRoute(place.slug, places.lang),
          lastmod: place.updatedAt,
          changefreq: 'daily',
          priority: 0.7,
        } as ISitemapField)
    );
  });

  return getServerSideSitemapLegacy(context, paths.flat());
};

export default function PlacesSitemap() {}
