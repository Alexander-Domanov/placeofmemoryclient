import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IPageContacts } from '@/types';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { useTranslation } from '@/components/internationalization';

const NotFound = ({ contacts }: IPageContacts) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>404 | MOGIILKI</title>
      </Head>
      <SiteLayout contacts={contacts}>
        <div className="bg-dark-700  h-screen relative">
          <div className="container">
            <div className="flex justify-center items-center text-base min-h-[575px]">
              404 | {t['404'].description}
            </div>
          </div>
        </div>
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
export default NotFound;
