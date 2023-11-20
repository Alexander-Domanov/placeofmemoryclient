import Head from 'next/head';
import { FC } from 'react';
import { GetStaticProps } from 'next';
import { useTranslation } from '@/components/internationalization';
import { IContacts } from '@/types';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { MapMain } from '@/modules/maps';

interface Props {
  contacts: IContacts;
}

const Map: FC<Props> = ({ contacts }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.map.indexTitle} | MOGILKI`}</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <MapMain />
      </SiteLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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
