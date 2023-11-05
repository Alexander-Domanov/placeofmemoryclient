import { NextPage } from 'next';
import React, { PropsWithChildren, ReactElement } from 'react';
import { Layout } from 'antd';
import dynamic from 'next/dynamic';
import { DashboardModals } from '@/components';
import styles from './DashboardLayout.module.scss';
import { DashboardHeader } from '@/components/layouts/components/DashboardHeader';

const DynamicDashboardSidebar = dynamic(
  () => import('./components/DashboardSidebar'),
  {
    ssr: false,
  }
);

const { Content } = Layout;

const DashboardLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Layout>
        <DashboardHeader />

        <Layout>
          <DynamicDashboardSidebar />

          <Layout>
            <Content className={styles.content}>{children}</Content>
          </Layout>
        </Layout>
      </Layout>

      <DashboardModals />
    </>
  );
};

export const getDashboardLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
