import Head from 'next/head';
import { FC } from 'react';
import { GetStaticProps } from 'next';
import { MapsMain } from '@/modules/maps-module/components/maps';
import { useTranslation } from '@/components/internationalization';
import { IContacts, IGetArticlesResponse } from '@/types';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';

interface Props {
  contacts: IContacts;
  posts: IGetArticlesResponse;
}

const Map: FC<Props> = ({ contacts, posts }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.map.indexTitle} | MOGILKI`}</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <MapsMain />
      </SiteLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data: contacts } = await getContacts();

  return {
    props: {
      contacts,
    },
    revalidate: 30,
  };
};
// Map.getLayout = getGlobalLayout;

export default Map;
