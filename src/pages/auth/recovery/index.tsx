import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Recovery } from '@/modules/auth-modules/new-password-recovery-module';
import { useTranslation } from '@/components/internationalization';
import { getArticlesPublic } from '@/modules/articles-module/api/articles-api';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IPageContacts } from '@/types';
import { Header } from '@/components';

export const getStaticProps: GetStaticProps = async () => {
  const { data: posts } = await getArticlesPublic();
  const { data: contacts } = await getContacts();

  return {
    props: {
      posts,
      time: Date.now(),
      contacts,
    },
    revalidate: 30,
  };
};
const PageRecovery = ({ contacts }: IPageContacts) => {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{t.auth.recovery.indexTile} | Mogilki</title>
      </Head>

      <Header />
      <Recovery />
    </div>
  );
};
export default PageRecovery;
