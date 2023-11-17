import Head from 'next/head';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import { dehydrate, DehydratedState } from '@tanstack/query-core';
import { QueryClient } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'node:querystring';
import { getGlobalLayout } from '@/components';
import { PlacesMain } from '@/modules/places-main-module/components/PlacesMain';
import { getPlacesMainForSSR } from '@/modules/places-main-module/api/places-main-api';
import { useTranslation } from '@/components/internationalization';

export const getStaticProps: GetStaticProps = async (
  context
): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const page = context.params?.page as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['places-main', page], () =>
    getPlacesMainForSSR({
      lang: context.locale,
      pageNumber: page,
    })
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
interface IParams extends ParsedUrlQuery {
  page: string;
}
export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const res = await getPlacesMainForSSR({});
  const staticPathsResult: GetStaticPathsResult<IParams> = {
    paths: [],
    fallback: true,
  };
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= res.pagesCount; i++) {
    staticPathsResult.paths.push({
      params: {
        page: i.toString(),
      },
    });
  }
  return staticPathsResult;
};

const Places = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.places.indexTitle} | MOGILKI</title>
      </Head>
      <div className="container">
        <PlacesMain />
      </div>
    </>
  );
};

Places.getLayout = getGlobalLayout;

export default Places;
