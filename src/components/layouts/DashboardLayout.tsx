import { NextPage } from 'next';
import React, { PropsWithChildren, ReactElement } from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import type { MenuProps } from 'antd/es/menu';
import dynamic from 'next/dynamic';
import { routes } from '@/common/routing/routes';
import {
  DashboardModals,
  DashboardSelectLanguage,
  DropdownMenuHeader,
} from '@/components';
import { useUserStore } from '@/store/userStore';
import styles from './DashboardLayout.module.scss';

const DynamicDashboardSidebar = dynamic(
  () => import('./components/DashboardSidebar'),
  {
    ssr: false,
  }
);

const { Header, Content } = Layout;

const DashboardLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const { userName } = useUserStore();

  const headerItems: MenuProps['items'] = [
    {
      key: '1',
      label: <DashboardSelectLanguage />,
    },
    {
      key: '2',
      label: userName ? (
        <div className="hidden sm:block w-[150px] text-light-300">
          <DropdownMenuHeader />
        </div>
      ) : null,
    },
  ];

  return (
    <>
      <Layout>
        <Header
          style={{ backgroundColor: '#292929' }}
          className="flex justify-between align-middle text-sm"
        >
          <div className="flex items-center font-kelsi text-xl">
            <Link style={{ color: '#fafafa' }} href={routes.main}>
              MOGILKI
            </Link>
          </div>

          <Menu
            style={{ backgroundColor: '#292929' }}
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={headerItems}
          />
        </Header>

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
