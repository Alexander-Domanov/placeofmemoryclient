import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from '@/components/internationalization';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IContacts, IGetPersonsResponse } from '@/types';
import { PersonsMain } from '@/modules/persons-module/components/PersonsMain';
import { getPersonsPublic } from '@/modules/persons-module/api/persons-api';
import { SITE_PERSONS_PER_PAGE } from '@/modules/persons-module/constants/persons-constants';

interface Props {
  contacts: IContacts;
  persons: IGetPersonsResponse;
}

const PersonsPage: NextPage<Props> = ({ contacts, persons }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t.people.indexTitle} | MOGILKI`}</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <PersonsMain persons={persons} />
      </SiteLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data: persons } = await getPersonsPublic(
    SITE_PERSONS_PER_PAGE,
    1,
    context.locale
  );

  const { data: contacts } = await getContacts();

  return {
    props: {
      persons,
      contacts,
    },
    revalidate: 30,
  };
};

export default PersonsPage;
