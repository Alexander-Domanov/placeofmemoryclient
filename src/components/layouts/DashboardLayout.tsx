import { NextPage } from 'next';
import React, { PropsWithChildren, ReactElement } from 'react';
import { Layout, Menu } from 'antd';
import { FolderOpenOutlined, LaptopOutlined } from '@ant-design/icons';
import { FaPlaceOfWorship, FaUsers } from 'react-icons/fa';
import Link from 'next/link';
import type { MenuProps } from 'antd/es/menu';
import { useRouter } from 'next/router';
import { FaNewspaper } from 'react-icons/fa6';
import { routes } from '@/common/routing/routes';
import { DashboardModals } from '@/components';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const sliderStyle: React.CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#fff',
};

const contentStyle: React.CSSProperties = {
  backgroundColor: '#F0F2F5',
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
      key: routes.dashboard.users.index,
      label: <Link href={routes.dashboard.users.index}>Users</Link>,
      icon: <FaUsers />,
    },
    {
      key: routes.dashboard.places.index,
      label: <Link href={routes.dashboard.places.index}>Places</Link>,
      icon: <FaPlaceOfWorship />,
    },
    {
      key: routes.dashboard.articles.index,
      label: <Link href={routes.dashboard.articles.index}>Articles</Link>,
      icon: <FaNewspaper />,
    },
  ];
  const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  return (
    <>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items1}
          />
        </Header>
        <Layout>
          <Sider width={200} style={sliderStyle}>
            <Menu
              mode="inline"
              style={{ height: '100%' }}
              items={items}
              selectedKeys={[router.asPath]}
            />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={contentStyle}>{children}</Content>
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
