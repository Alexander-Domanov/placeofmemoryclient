import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getGlobalLayout } from '@/components';
import { PlacesMain } from '@/modules/places-main-module/components/PlacesMain';
import { getPlacesMainForSSR } from '@/modules/places-main-module/api/places-main-api';
import { useTranslation } from '@/components/internationalization';
import { generateArray } from '@/common/helpers/generateArray';
import { IPlacesMainResponse } from '@/modules/places-main-module';
import { IContacts } from '@/types';

interface IProps {
  places: IPlacesMainResponse;
  contacts: IContacts;
}
export const getStaticProps: GetStaticProps = async (context) => {
  const page = context.params?.page as string;

  const places = await getPlacesMainForSSR({
    lang: context.locale,
    pageNumber: page,
  });
  return {
    props: { places },
    revalidate: 30,
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const by = await getPlacesMainForSSR({ lang: 'by' });
  const ru = await getPlacesMainForSSR({ lang: 'ru' });

  const pathsBy = generateArray(2, by.pagesCount).map((page) => ({
    params: { page: `${page}` },
    locale: 'by',
  }));
  const pathsRu = generateArray(2, ru.pagesCount).map((page) => ({
    params: { page: `${page}` },
    locale: 'ru',
  }));
  return {
    paths: [...pathsBy, ...pathsRu],
    fallback: 'blocking',
  };
};

const Places = ({ places }: IProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.places.indexTitle} | MOGILKI</title>
      </Head>
      <div className="container">
        <PlacesMain places={places} />
      </div>
    </>
  );
};

Places.getLayout = getGlobalLayout;

export default Places;
