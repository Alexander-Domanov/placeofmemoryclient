import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { UserList } from '@/modules/users-module/components/UserList';

const UsersList = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      <UserList />
    </>
  );
};

UsersList.getLayout = getDashboardLayout;
export default UsersList;
