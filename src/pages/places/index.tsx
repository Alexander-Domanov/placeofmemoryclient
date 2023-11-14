import Head from 'next/head';
import { GetStaticProps } from 'next';
import { dehydrate, DehydratedState } from '@tanstack/query-core';
import { QueryClient } from '@tanstack/react-query';
import { getGlobalLayout } from '@/components';
import { PlacesMain } from '@/modules/places-main-module/components/PlacesMain';
import { getPlacesMainForSSR } from '@/modules/places-main-module/api/places-main-api';
import { useTranslation } from '@/components/internationalization';

export const getStaticProps: GetStaticProps = async (
  context
): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['places-main'], () =>
    getPlacesMainForSSR({ lang: context.locale })
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
const Places = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.places.indexTitle} | MOGILKI</title>
      </Head>
      <PlacesMain />
    </>
  );
};

Places.getLayout = getGlobalLayout;

export default Places;
