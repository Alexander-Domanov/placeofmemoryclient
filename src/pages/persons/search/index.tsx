import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IContacts, IGetPersonsResponse } from '@/types';
import { getPersonsPublic } from '@/modules/persons-module/api/persons-api';
import { SITE_PERSONS_PER_PAGE } from '@/modules/persons-module/constants/persons-constants';
import { PersonsSearchMain } from '@/modules/persons-module/components/PersonsSearchMain';

interface Props {
  contacts: IContacts;
  persons: IGetPersonsResponse;
}

const PersonsSearchPage: NextPage<Props> = ({ contacts, persons }) => {
  return (
    <>
      <Head>
        <title>Search</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <PersonsSearchMain persons={persons} />
      </SiteLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: persons } = await getPersonsPublic(
    SITE_PERSONS_PER_PAGE,
    1,
    context.locale,
    (context.query.name as string).toLowerCase(),
    (context.query.lastName as string).toLowerCase()
  );

  const { data: contacts } = await getContacts();

  return {
    props: {
      persons,
      contacts,
    },
  };
};

export default PersonsSearchPage;
