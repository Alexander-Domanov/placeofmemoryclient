import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { UserList } from '@/modules/users-module/components/UserList';
import { useTranslation } from '@/components/internationalization';

const UsersList = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.users.drawer.title} | MOGILKI`}</title>
      </Head>

      <UserList />
    </>
  );
};

UsersList.getLayout = getDashboardLayout;
export default UsersList;
