import Head from 'next/head';
import { EditProfile } from '@/modules/account-modules/edit-profile-module';
import { getGlobalLayout } from '@/components';
import { useTranslation } from '@/components/internationalization';

const Settings = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.account.indexTitle}| Mogilki</title>
      </Head>
      <EditProfile />
    </>
  );
};
Settings.getLayout = getGlobalLayout;

export default Settings;
