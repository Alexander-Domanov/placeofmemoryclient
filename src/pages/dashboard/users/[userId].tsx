import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { UserList } from '@/modules/users-module/components/UserList';
import { useTranslation } from '@/components/internationalization';
import { nameLogo } from '@/common/constants';

const UsersList = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t.dashboard.users.drawer.title} | ${nameLogo}`}</title>
      </Head>

      <UserList />
    </>
  );
};

UsersList.getLayout = getDashboardLayout;
export default UsersList;
