import React, { FC, useState } from 'react';
import {
  Avatar,
  Button,
  ConfigProvider,
  Drawer,
  Flex,
  Layout,
  Menu,
  Modal,
  notification,
  Typography,
} from 'antd';
import Link from 'next/link';
import { FaBars, FaNewspaper, FaRightFromBracket } from 'react-icons/fa6';
import { FolderOpenOutlined, LaptopOutlined } from '@ant-design/icons';
import { FaUsers } from 'react-icons/fa';
import { MdOutlinePlace } from 'react-icons/md';
import { GoPeople } from 'react-icons/go';
import { BsPencilSquare } from 'react-icons/bs';
import { MenuProps } from 'antd/es/menu';
import { useRouter } from 'next/router';
import { useMeQuery } from '@/services';
import { DashboardSelectLanguage } from '@/components';
import styles from './DashboardHeader.module.scss';
import { routes } from '@/common/routing/routes';
import { useLogout } from '@/modules/auth-modules/logout-module';

type MenuItem = Required<MenuProps>['items'][number];

const { confirm } = Modal;
const { Header } = Layout;
const { Text } = Typography;

export const DashboardHeader: FC = () => {
  const router = useRouter();

  const { data: me } = useMeQuery();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { sendLogoutAsync } = useLogout();

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

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

  const onMenuClick = ({ key }: { key: string }) => {
    if (key !== 'logout') {
      closeDrawer();
    }
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
      key: 'logout',
      label: 'Logout',
      icon: <FaRightFromBracket />,
      danger: true,
      onClick: onLogout,
    },
  ];

  return (
    <>
      <Header className={styles.header}>
        <Flex align="center" justify="space-between" gap="middle">
          <div>
            <Link href={routes.main} className={styles.logo}>
              MOGILKI
            </Link>
          </div>

          <Flex align="center" gap="middle">
            <DashboardSelectLanguage />

            <Flex align="center" gap="small" className={styles.userInfo}>
              <Avatar src={me?.urlAvatar} />

              <Text className={styles.username}>{me?.userName}</Text>
            </Flex>

            <Button
              icon={<FaBars />}
              type="text"
              onClick={() => setIsDrawerOpen(true)}
              className={styles.bars}
            />
          </Flex>
        </Flex>
      </Header>

      <ConfigProvider
        theme={{
          components: {
            Menu: {
              activeBarBorderWidth: 0,
            },
          },
        }}
      >
        <Drawer
          title="Menu"
          placement="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Menu
            items={items}
            mode="vertical"
            selectedKeys={[router.asPath]}
            onClick={onMenuClick}
          />
        </Drawer>
      </ConfigProvider>
    </>
  );
};
