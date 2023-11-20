import Head from 'next/head';
import { GetStaticProps } from 'next';
import { PlaceMain } from '@/modules/places-main-module/components/PlaceMain';
import {
  getPlaceMain,
  getPlacesMain,
} from '@/services/api/places-api/places-main-api';
import { useTranslation } from '@/components/internationalization';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { IPageContacts, IPlacesMain } from '@/types';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';

interface IPageProps extends IPageContacts {
  place: IPlacesMain;
}
export const getStaticProps: GetStaticProps = async (
  context
): Promise<{
  props: IPageProps;
}> => {
  const slug = context.params?.slug as string;

  const place = await getPlaceMain({ slug, lang: context.locale });
  const { data: contacts } = await getContacts();
  return {
    props: {
      place,
      contacts,
    },
  };
};
export const getStaticPaths = async () => {
  const resBy = await getPlacesMain({ lang: 'by' });
  const resRu = await getPlacesMain({ lang: 'ru' });
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

const Place = ({ place, contacts }: IPageProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{t.places.place.indexTitle} | MOGILKI</title>
      </Head>
      <SiteLayout contacts={contacts}>
        <PlaceMain place={place} />
      </SiteLayout>
    </div>
  );
};

export default Place;
