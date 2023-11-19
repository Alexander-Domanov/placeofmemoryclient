import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PlacesMain } from '@/modules/places-main-module/components/PlacesMain';
import { getPlacesMainForSSR } from '@/modules/places-main-module/api/places-main-api';
import { useTranslation } from '@/components/internationalization';
import { generateArray } from '@/common/helpers/generateArray';
import { IPlacesMainResponse } from '@/modules/places-main-module';
import { IContacts } from '@/types';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';

interface IProps {
  places: IPlacesMainResponse;
  contacts: IContacts;
}
export const getStaticProps: GetStaticProps = async (
  context
): Promise<{ props: IProps; revalidate: number }> => {
  const page = context.params?.page as string;

  const places = await getPlacesMainForSSR({
    lang: context.locale,
    pageNumber: page,
  });
  const { data: contacts } = await getContacts();
  return {
    props: { places, contacts },
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

const Places = ({ places, contacts }: IProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.places.indexTitle} | MOGILKI</title>
      </Head>
      <SiteLayout contacts={contacts}>
        <PlacesMain places={places} />
      </SiteLayout>
    </>
  );
};

export default Places;
