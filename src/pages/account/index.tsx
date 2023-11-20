import Head from 'next/head';
import { GetStaticProps } from 'next';
import { FC } from 'react';
import { EditProfile } from '@/modules/account-modules/edit-profile-module';
import { useTranslation } from '@/components/internationalization';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { IPageContacts } from '@/types';

const Settings: FC<IPageContacts> = ({ contacts }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.account.indexTitle}| Mogilki</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <EditProfile />
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

export default Settings;
