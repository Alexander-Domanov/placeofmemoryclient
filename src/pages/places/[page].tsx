import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PlacesMain } from '@/modules/places-main-module/components/PlacesMain';
import { useTranslation } from '@/components/internationalization';
import { generateArray } from '@/common/helpers/generateArray';
import { IContacts, IGetPlacesResponse } from '@/types';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { getPlacesMain } from '@/services';
import { nameLogo } from '@/common/constants';

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

export const getStaticPaths: GetStaticPaths = async (context) => {
  const fetchData = async (lang: string) => {
    const data = await getPlacesMain({
      lang,
    });

    return { data, lang };
  };

  const [...allPlaces] = await Promise.all(
    (context.locales || []).map((locale) => fetchData(locale))
  );

  const paths = allPlaces.map((places) => {
    return generateArray(1, places.data.pagesCount).map((page) => ({
      params: { page: `${page}` },
      locale: places.lang,
    }));
  });

  return {
    paths: paths.flat(),
    fallback: 'blocking',
  };
};

const Places = ({ places, contacts }: IProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.places.indexTitle} | ${nameLogo}`}</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <PlacesMain places={places} />
      </SiteLayout>
    </>
  );
};

export default Places;
