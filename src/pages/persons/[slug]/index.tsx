import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import {
  getPersonPublic,
  getPersonsPublic,
} from '@/modules/persons-module/api/persons-api';
import { IContacts, IPerson } from '@/types';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { PersonMain } from '@/modules/persons-module/components/PersonMain';

interface Props {
  person: IPerson;
  contacts: IContacts;
}

const PersonPage: NextPage<Props> = ({ person, contacts }) => {
  return (
    <>
      <Head>
        <title>{`${person.firstName} ${person.lastName} | MOGILKI`}</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <PersonMain person={person} />
      </SiteLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;

  const { data: person } = await getPersonPublic(slug, context.locale);

  const { data: contacts } = await getContacts();

  return {
    props: {
      person,
      contacts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: personsBy } = await getPersonsPublic(20, 1, 'by');
  const { data: personsRu } = await getPersonsPublic(20, 1, 'ru');

  const pathsBy = personsBy.items.map((person) => ({
    params: { slug: person.slug },
    locale: 'by',
  }));

  const pathsRu = personsRu.items.map((person) => ({
    params: { slug: person.slug },
    locale: 'by',
  }));

  return {
    paths: [...pathsBy, ...pathsRu],
    fallback: 'blocking',
  };
};

export default PersonPage;
