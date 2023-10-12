import { NextPage } from 'next';
import React, { PropsWithChildren, ReactElement } from 'react';
import { Layout, Menu } from 'antd';
import { FolderOpenOutlined, LaptopOutlined } from '@ant-design/icons';
import { FaUsers } from 'react-icons/fa';
import Link from 'next/link';
import { routes } from '@/common/routing/routes';
import { DashboardModals } from '@/components';

const siderStyle: React.CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#fff',
};

const contentStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: 24,
};

const DashboardLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Layout>
        <Layout.Sider width={200} style={siderStyle}>
          <Menu mode="inline" style={{ height: '100%' }}>
            <Menu.Item key="dashboard" icon={<LaptopOutlined />}>
              <Link href={routes.dashboard.index}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="gallery" icon={<FolderOpenOutlined />}>
              <Link href={routes.dashboard.gallery}>Gallery</Link>
            </Menu.Item>
            <Menu.Item key="users" icon={<FaUsers />}>
              <Link href={routes.dashboard.users}>Users</Link>
            </Menu.Item>
          </Menu>
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
