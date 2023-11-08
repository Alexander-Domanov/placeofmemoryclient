import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  ContactsOutlined,
  FolderOpenOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
import { FaUsers } from 'react-icons/fa';
import { MdOutlinePlace } from 'react-icons/md';
import { GoPeople } from 'react-icons/go';
import { FaNewspaper, FaRightFromBracket } from 'react-icons/fa6';
import { BsPencilSquare } from 'react-icons/bs';
import { useMediaQuery } from 'usehooks-ts';
import { Layout, Menu, Modal, notification } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { routes } from '@/common/routing/routes';

import styles from './DashboardSidebar.module.scss';
import { useLogout } from '@/modules/auth-modules/logout-module';

const { Sider } = Layout;
const { confirm } = Modal;

type MenuItem = Required<MenuProps>['items'][number];

const DashboardSidebar: FC = () => {
  const router = useRouter();

  const { sendLogoutAsync } = useLogout();

  const onLogout = () => {
    confirm({
      title: 'Do you want to logout?',
      okType: 'danger',
      maskClosable: true,
      async onOk() {
        await sendLogoutAsync();

        notification.success({
          message: 'You was logged out',
          placement: 'bottomLeft',
        });
      },
    });
  };

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
    {
      key: routes.dashboard.contacts.index,
      label: <Link href={routes.dashboard.contacts.index}>Contacts</Link>,
      icon: <ContactsOutlined />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <FaRightFromBracket />,
      danger: true,
      onClick: onLogout,
    },
  ];

  const isLT1024px = useMediaQuery('(max-width: 1023px)');

  return (
    <Sider
      width={200}
      collapsedWidth={60}
      className={styles.sidebar}
      collapsed={isLT1024px}
    >
      <Menu
        mode="inline"
        className={styles.menu}
        items={items}
        selectedKeys={[router.asPath]}
      />
    </Sider>
  );
};

export default DashboardSidebar;
