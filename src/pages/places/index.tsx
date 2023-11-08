import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, DehydratedState } from '@tanstack/query-core';
import { QueryClient } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'node:querystring';
import { getGlobalLayout } from '@/components';
import { PlacesMain } from '@/modules/places-main-module/components/PlacesMain';
import { getPlacesMainForSSR } from '@/modules/places-main-module/api/places-main-api';

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['places-main'], getPlacesMainForSSR);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
const Places = () => {
  return (
    <>
      <Head>
        <title>МЕСЦА | MOGILKI</title>
      </Head>
      <PlacesMain />
    </>
  );
};

Places.getLayout = getGlobalLayout;

export default Places;
