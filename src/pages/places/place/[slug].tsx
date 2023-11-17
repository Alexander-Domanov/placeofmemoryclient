import Head from 'next/head';
import { GetStaticProps } from 'next';
import { dehydrate, DehydratedState } from '@tanstack/query-core';
import { QueryClient } from '@tanstack/react-query';
import { PlaceMain } from '@/modules/places-main-module/components/PlaceMain';
import {
  getPlaceMainForSSR,
  getPlacesMainForSSR,
} from '@/modules/places-main-module/api/places-main-api';
import { IPlacesMain } from '@/modules/places-main-module';
import { getGlobalLayout } from '@/components';
import { useTranslation } from '@/components/internationalization';

export const getStaticProps: GetStaticProps = async (
  context
): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const slug = context.params?.slug as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ['place-main', slug],
    async (): Promise<IPlacesMain> =>
      await getPlaceMainForSSR({ slug, lang: context.locale })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export const getStaticPaths = async () => {
  const resBy = await getPlacesMainForSSR({});
  const resRu = await getPlacesMainForSSR({ lange: 'ru' });
  const pathsBy = resBy.items.map((place) => ({
    params: { slug: place.slug },
    locale: 'by',
  }));
  const pathsRu = resRu.items.map((place) => ({
    params: { slug: place.slug },
    locale: 'ru',
  }));
  return {
    paths: [...pathsBy, ...pathsRu],
    fallback: 'blocking',
  };
};

const Place = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{t.places.place.indexTitle} | MOGILKI</title>
      </Head>
      <PlaceMain />
    </div>
  );
};

Place.getLayout = getGlobalLayout;

export default Place;
