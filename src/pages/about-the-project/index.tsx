import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from '@/components/internationalization';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { About } from '@/modules/about-module/About';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { IContacts } from '@/types';
import { nameLogo } from '@/common/constants';

interface Props {
  contacts: IContacts;
}

const AboutTheProject: NextPage<Props> = ({ contacts }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.aboutTheProject.indexTitle} | ${nameLogo}`}</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <About contacts={contacts} />
      </SiteLayout>
    </>
  );
};
export const getStaticProps: GetStaticProps = async (context) => {
  const lang = context.locale?.toLowerCase() || 'by';

  const { data: contacts } = await getContacts(lang);

  return {
    props: {
      contacts,
    },
    revalidate: 30,
  };
};

export default AboutTheProject;
