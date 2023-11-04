import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FolderOpenOutlined, LaptopOutlined } from '@ant-design/icons';
import { FaUsers } from 'react-icons/fa';
import { MdOutlinePlace } from 'react-icons/md';
import { GoPeople } from 'react-icons/go';
import { FaNewspaper } from 'react-icons/fa6';
import { BsPencilSquare } from 'react-icons/bs';
import { useMediaQuery } from 'usehooks-ts';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { routes } from '@/common/routing/routes';

import styles from './DashboardSidebar.module.scss';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const DashboardSidebar: FC = () => {
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
      key: routes.dashboard.languages.index,
      label: <Link href={routes.dashboard.languages.index}>Languages</Link>,
      icon: <BsPencilSquare />,
    },
  ];

  const isLT1024px = useMediaQuery('(max-width: 1023px)');

  return (
    <Sider width={200} className={styles.sidebar} collapsed={isLT1024px}>
      <Menu
        mode="inline"
        style={{ height: '100%' }}
        items={items}
        selectedKeys={[router.asPath]}
      />
    </Sider>
  );
};

export default DashboardSidebar;
