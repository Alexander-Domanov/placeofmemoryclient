import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IContacts, IGetPersonsResponse } from '@/types';
import { getPersonsPublic } from '@/modules/persons-module/api/persons-api';
import { SITE_PERSONS_PER_PAGE } from '@/modules/persons-module/constants/persons-constants';
import { PersonsSearchMain } from '@/modules/persons-module/components/PersonsSearchMain';
import { useTranslation } from '@/components/internationalization';

interface Props {
  contacts: IContacts;
  persons: IGetPersonsResponse;
}

const PersonsSearchPage: NextPage<Props> = ({ contacts, persons }) => {
  const { t } = useTranslation();

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
  const { data: persons } = await getPersonsPublic({
    pageSize: SITE_PERSONS_PER_PAGE,
    pageNumber: context.query.page ? +context.query.page : 1,
    lang: context.locale,
    name: context.query.name as string,
    lastName: context.query.lastName as string,
    birthDate: context.query.birthDate as string,
    country: context.query.country as string,
    city: context.query.city as string,
    deathDate: context.query.deathDate as string,
    filterConditionBirthDate: context.query.filterConditionBirthDate as string,
    filterConditionDeathDate: context.query.filterConditionDeathDate as string,
  });

  const { data: contacts } = await getContacts();

  return {
    props: {
      persons,
      contacts,
    },
  };
};

export default PersonsSearchPage;
