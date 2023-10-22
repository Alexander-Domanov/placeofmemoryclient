import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';

const UsersList = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
    </>
  );
};

UsersList.getLayout = getDashboardLayout;
export default UsersList;
