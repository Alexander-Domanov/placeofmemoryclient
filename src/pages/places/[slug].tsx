import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, DehydratedState } from '@tanstack/query-core';
import { QueryClient } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'node:querystring';
import { PlaceMain } from '@/modules/places-main-module/components/PlaceMain';
import {
  getPlaceMainForSSR,
  getPlacesMainForSSR,
} from '@/modules/places-main-module/api/places-main-api';
import { IPlacesMain } from '@/modules/places-main-module';
import { getGlobalLayout } from '@/components';
import Places from '@/pages/places/index';

export const getStaticProps: GetStaticProps = async (
  context
): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const slug = context.params?.slug as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ['place-main', slug],
    async (): Promise<IPlacesMain> => await getPlaceMainForSSR({ slug })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
interface IParams extends ParsedUrlQuery {
  slug: string;
}
export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const res = await getPlacesMainForSSR({});
  const paths = res.items.map((place) => ({
    params: { slug: place.slug },
  }));
  return {
    paths,
    fallback: true,
  };
};

const Place = () => {
  return (
    <div>
      <Head>
        <title>МЕСЦА | MOGILKI</title>
      </Head>
      <PlaceMain />
    </div>
  );
};

Place.getLayout = getGlobalLayout;

export default Place;
