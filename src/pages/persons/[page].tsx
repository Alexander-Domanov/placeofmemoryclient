import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useTranslation } from '@/components/internationalization';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IContacts, IGetPersonsResponse } from '@/types';
import { PersonsMain } from '@/modules/persons-module/components/PersonsMain';
import { getPersonsPublicMain } from '@/modules/persons-module/api/persons-api';
import { SITE_PERSONS_PER_PAGE } from '@/modules/persons-module/constants/persons-constants';
import { generateArray } from '@/common/helpers/generateArray';
import { nameLogo } from '@/common/constants';

interface Props {
  contacts: IContacts;
  persons: IGetPersonsResponse;
}

const PersonsPage: NextPage<Props> = ({ contacts, persons }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t.people.indexTitle} | ${nameLogo}`}</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <PersonsMain persons={persons} />
      </SiteLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<{ props: Props; revalidate: number }> => {
  const page = context.params?.page as string;

  const persons = await getPersonsPublicMain({
    pageSize: SITE_PERSONS_PER_PAGE,
    pageNumber: +page,
    lang: context.locale,
  });

  const { data: contacts } = await getContacts();

  return {
    props: {
      persons,
      contacts,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const fetchData = async (lang: string) => {
    const data = await getPersonsPublicMain({
      pageSize: SITE_PERSONS_PER_PAGE,
      lang,
    });

    return { data, lang };
  };

  const [...allPersons] = await Promise.all(
    (context.locales || []).map((locale) => fetchData(locale))
  );

  const paths = allPersons.map((persons) => {
    return generateArray(1, persons.data.pagesCount).map((page) => ({
      params: { page: `${page}` },
      locale: persons.lang,
    }));
  });

  return {
    paths: paths.flat(),
    fallback: 'blocking',
  };
};

export default PersonsPage;
