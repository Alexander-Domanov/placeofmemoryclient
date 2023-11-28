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
  Tooltip,
  Typography,
} from 'antd';
import { FaBars } from 'react-icons/fa6';
import { MenuProps } from 'antd/es/menu';
import { useRouter } from 'next/router';
import { UserOutlined } from '@ant-design/icons';
import { useMeQuery } from '@/services';
import styles from './DashboardHeader.module.scss';
import { useLogout } from '@/modules/auth-modules/logout-module';
import { GetMenuItems } from '@/components/layouts/components/GetMenuItems';
import {
  LanguageSwitcher,
  useTranslation,
} from '@/components/internationalization';
import { Logo } from '@/components';

type MenuItem = Required<MenuProps>['items'][number];

const { confirm } = Modal;
const { Header } = Layout;
const { Text } = Typography;

export const DashboardHeader: FC = () => {
  const { t } = useTranslation();
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

  const items: MenuItem[] = GetMenuItems(me, onLogout);

  return (
    <>
      <Header className={styles.header} style={{ background: 'rgb(44 44 44)' }}>
        <Flex align="center" justify="space-between" gap="middle">
          <Logo />

          <Flex align="center" gap="middle">
            <LanguageSwitcher />

            <Flex align="center" gap="small" className={styles.userInfo}>
              <Tooltip
                title={`role: ${me?.role}`}
                placement="bottom"
                color="#1087f6"
              >
                <Avatar src={me?.urlAvatar} icon={<UserOutlined />} />
              </Tooltip>

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
          title={t.dashboard.menu.menu}
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
