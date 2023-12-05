import Head from 'next/head';
import { FC } from 'react';
import { GetStaticProps } from 'next';
import { useTranslation } from '@/components/internationalization';
import { IContacts, IGerPersonsForMapResponse } from '@/types';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { MapMain } from '@/modules/maps';
import { getPersonsPublicPersons } from '@/modules/dashboard-module/api/persons-for-map-api';
import { nameLogo } from '@/common/constants';

interface Props {
  contacts: IContacts;
  persons: IGerPersonsForMapResponse;
}

const Map: FC<Props> = ({ contacts, persons }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.map.indexTitle} | ${nameLogo}`}</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <MapMain persons={persons} />
      </SiteLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data: persons } = await getPersonsPublicPersons(context.locale);
  const { data: contacts } = await getContacts();

  return {
    props: {
      contacts,
      persons,
    },
    revalidate: 30,
  };
};
// Map.getLayout = getGlobalLayout;

export default Map;
