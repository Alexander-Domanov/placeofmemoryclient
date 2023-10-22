import { NextPage } from 'next';
import React, { PropsWithChildren, ReactElement } from 'react';
import { Layout, Menu } from 'antd';
import { FolderOpenOutlined, LaptopOutlined } from '@ant-design/icons';
import { FaPlaceOfWorship, FaUsers } from 'react-icons/fa';
import Link from 'next/link';
import type { MenuProps } from 'antd/es/menu';
import { useRouter } from 'next/router';
import { routes } from '@/common/routing/routes';
import { DashboardModals } from '@/components';

type MenuItem = Required<MenuProps>['items'][number];

const siderStyle: React.CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#fff',
};

const contentStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: 24,
};

const DashboardLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const items: MenuItem[] = [
    {
      key: routes.dashboard.index,
      label: <Link href={routes.dashboard.index}>Dashboard</Link>,
      icon: <LaptopOutlined />,
    },
    {
      key: routes.dashboard.gallery,
      label: <Link href={routes.dashboard.gallery}>Gallery</Link>,
      icon: <FolderOpenOutlined />,
    },
    {
      key: routes.dashboard.users,
      label: <Link href={routes.dashboard.users}>Users</Link>,
      icon: <FaUsers />,
    },
    {
      key: routes.dashboard.places,
      label: <Link href={routes.dashboard.places}>Places</Link>,
      icon: <FaPlaceOfWorship />,
    },
  ];

  return (
    <>
      <Layout>
        <Layout.Sider width={200} style={siderStyle}>
          <Menu
            mode="inline"
            style={{ height: '100%' }}
            items={items}
            selectedKeys={[router.asPath]}
          />
        </Layout.Sider>

        <Layout>
          <Layout.Content style={contentStyle}>{children}</Layout.Content>
        </Layout>
      </Layout>

      <DashboardModals />
    </>
  );
};

export const getDashboardLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
