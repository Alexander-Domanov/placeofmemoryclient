import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useTranslation } from '@/components/internationalization';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IContacts, IGetPersonsResponse } from '@/types';
import { PersonsMain } from '@/modules/persons-module/components/PersonsMain';
import { getPersonsPublic } from '@/modules/persons-module/api/persons-api';
import { SITE_PERSONS_PER_PAGE } from '@/modules/persons-module/constants/persons-constants';
import { generateArray } from '@/common/helpers/generateArray';
import { routes } from '@/common/routing/routes';

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
  const page = context.params?.page as string;

  if (page === '1') {
    return {
      redirect: {
        destination: routes.persons.index,
        locale: context.locale,
        permanent: false,
      },
    };
  }

  const { data: persons } = await getPersonsPublic(
    SITE_PERSONS_PER_PAGE,
    +page,
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: personsBy } = await getPersonsPublic(SITE_PERSONS_PER_PAGE);

  const pathsBy = generateArray(2, personsBy.pagesCount).map((page) => ({
    params: { page: `${page}` },
    locale: 'by',
  }));

  const pathsRu = generateArray(2, personsBy.pagesCount).map((page) => ({
    params: { page: `${page}` },
    locale: 'ru',
  }));

  return {
    paths: [...pathsBy, ...pathsRu],
    fallback: 'blocking',
  };
};

export default PersonsPage;
