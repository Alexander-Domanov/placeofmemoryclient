import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PlacesMain } from '@/modules/places-main-module/components/PlacesMain';
import { useTranslation } from '@/components/internationalization';
import { generateArray } from '@/common/helpers/generateArray';
import { IContacts, IGetPlacesResponse } from '@/types';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { getPlacesMain } from '@/services';

interface IProps {
  places: IGetPlacesResponse;
  contacts: IContacts;
}
export const getStaticProps: GetStaticProps = async (
  context
): Promise<{ props: IProps; revalidate: number }> => {
  const page = context.params?.page as string;

  const places = await getPlacesMain({
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
  const by = await getPlacesMain({ lang: 'by' });
  const ru = await getPlacesMain({ lang: 'ru' });

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
