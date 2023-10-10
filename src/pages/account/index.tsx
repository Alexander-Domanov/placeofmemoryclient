import Head from 'next/head';
import { EditProfile } from '@/modules/account-modules/edit-profile-module';
import { getGlobalLayout } from '@/components';

const Settings = () => {
  return (
    <>
      <Head>
        <title>Edit Profile | Minsk</title>
      </Head>
      <EditProfile />
    </>
  );
};
Settings.getLayout = getGlobalLayout;

export default Settings;
