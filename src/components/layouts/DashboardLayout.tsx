import { NextPage } from 'next';
import React, { PropsWithChildren, ReactElement } from 'react';
import { Layout, Menu } from 'antd';
import { FolderOpenOutlined, LaptopOutlined } from '@ant-design/icons';
import { FaUsers } from 'react-icons/fa';
import { MdOutlinePlace } from 'react-icons/md';
import { GoPeople } from 'react-icons/go';
import Link from 'next/link';
import type { MenuProps } from 'antd/es/menu';
import { useRouter } from 'next/router';
import { FaNewspaper } from 'react-icons/fa6';
import { BsPencilSquare } from 'react-icons/bs';
import { routes } from '@/common/routing/routes';
import {
  DashboardModals,
  DashboardSelectLanguage,
  DropdownMenuHeader,
} from '@/components';
import { LinkComponent } from '@/ui';
import { useUserStore } from '@/store/userStore';

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
  const { userName } = useUserStore();
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
      icon: <MdOutlinePlace />,
    },
    {
      key: routes.dashboard.persons.index,
      label: <Link href={routes.dashboard.persons.index}>Persons</Link>,
      icon: <GoPeople />,
    },
    {
      key: routes.dashboard.articles.index,
      label: <Link href={routes.dashboard.articles.index}>Articles</Link>,
      icon: <FaNewspaper />,
    },
    {
      key: routes.dashboard.language.index,
      label: (
        <LinkComponent
          href={routes.dashboard.language.index}
          title="Language"
        />
      ),
      icon: <BsPencilSquare />,
    },
  ];
  const headerItems: MenuProps['items'] = [
    {
      key: '1',
      label: <DashboardSelectLanguage />,
    },
    {
      key: '2',
      label: userName ? (
        <div className="w-[150px]">
          <DropdownMenuHeader />
        </div>
      ) : null,
    },
  ];

  return (
    <>
      <Layout>
        <Header className="flex justify-between align-middle text-sm">
          <div className="flex items-center font-kelsi text-xl">
            <Link href={routes.main}>MOGILKI</Link>
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={headerItems}
            inlineCollapsed={false}
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
