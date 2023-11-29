import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'usehooks-ts';
import { Layout, Menu, Modal } from 'antd';
import type { MenuProps } from 'antd/es/menu';

import styles from './DashboardSidebar.module.scss';
import { useLogout } from '@/modules/auth-modules/logout-module';
import { useMeQuery } from '@/services';
import { GetMenuItems } from '@/components/layouts/components/GetMenuItems';
import { useTranslation } from '@/components/internationalization';

const { Sider } = Layout;
const { confirm } = Modal;

type MenuItem = Required<MenuProps>['items'][number];

const DashboardSidebar: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { data: me } = useMeQuery();
  const { sendLogoutAsync } = useLogout();

  const onLogout = () => {
    confirm({
      title: t.dashboard.logout.description,
      okType: 'danger',
      okText: t.dashboard.logout.logout,
      cancelText: t.dashboard.logout.cancel,
      maskClosable: true,
      async onOk() {
        await sendLogoutAsync();
      },
    });
  };

  const items: MenuItem[] = GetMenuItems(me, onLogout);

  const isLT1024px = useMediaQuery('(max-width: 1023px)');

  return (
    <>
      {isLT1024px ? null : (
        <Sider width={200} collapsedWidth={60} className={styles.sidebar}>
          <Menu
            mode="inline"
            className={styles.menu}
            items={items}
            selectedKeys={[router.asPath]}
          />
        </Sider>
      )}
    </>
  );
};

export default DashboardSidebar;
