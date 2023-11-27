import Link from 'next/link';
import {
  AppstoreOutlined,
  ContactsOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  FaNewspaper,
  FaPeopleGroup,
  FaRightFromBracket,
} from 'react-icons/fa6';
import { FaUsersCog } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { Key, ReactNode } from 'react';
import { MenuProps } from 'antd/es/menu';
import { IoImagesOutline } from 'react-icons/io5';
import { GrMapLocation } from 'react-icons/gr';
import { GiCandleFlame } from 'react-icons/gi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { routes } from '@/common/routing/routes';
import { Role } from '@/types';
import { useTranslation } from '@/components/internationalization';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const DIVIDER = { type: 'divider' };

export const GetMenuItems = (
  me?: { role: Role },
  onLogout?: () => void
): MenuItem[] => {
  const { t } = useTranslation();

  const menuItems = {
    common: [
      getItem(
        <Link href={routes.dashboard.index}>{t.dashboard.menu.map}</Link>,
        routes.dashboard.index,
        <GrMapLocation />
      ),
      getItem(
        <Link href={routes.dashboard.gallery.index}>
          {t.dashboard.menu.gallery}
        </Link>,
        routes.dashboard.gallery.index,
        <IoImagesOutline />
      ),
    ],
    articles: [
      getItem(
        <Link href={routes.dashboard.articles.index}>
          {t.dashboard.menu.articles}
        </Link>,
        routes.dashboard.articles.index,
        <FaNewspaper />
      ),
    ],
    places: [
      getItem(
        <Link href={routes.dashboard.places.index}>
          {t.dashboard.menu.places}
        </Link>,
        routes.dashboard.places.index,
        <GiCandleFlame />
      ),
    ],
    persons: [
      getItem(
        <Link href={routes.dashboard.persons.index}>
          {t.dashboard.menu.people}
        </Link>,
        routes.dashboard.persons.index,
        <FaPeopleGroup />
      ),
    ],
    logout: [
      {
        key: 'logout',
        label: t.dashboard.menu.logout,
        icon: <FaRightFromBracket />,
        danger: true,
      },
    ],
  };

  const { common, persons, articles, logout } = menuItems;

  const groupingCommon = (): MenuItem[] => {
    const { common } = menuItems;
    return [
      getItem(
        t.dashboard.menu.dashboard,
        'dashboard',
        <LuLayoutDashboard />,
        [...common],
        'group'
      ),
    ];
  };

  const groupingContent = (): MenuItem[] => {
    const { articles, places, persons } = menuItems;
    return [
      getItem(
        t.dashboard.menu.content,
        'content',
        <AppstoreOutlined />,
        [...articles, ...places, ...persons],
        'group'
      ),
    ];
  };

  const logoutItem = [
    ...logout.map((item) => ({ ...item, onClick: onLogout })),
  ];

  const roleSpecificItems = {
    [Role.ADMIN]: [
      ...groupingCommon(),
      DIVIDER,
      ...groupingContent(),
      DIVIDER,
      getItem(
        t.dashboard.menu.settings,
        'settings',
        <SettingOutlined />,
        [
          getItem(
            <Link href={routes.dashboard.users.index}>
              {t.dashboard.menu.users}
            </Link>,
            routes.dashboard.users.index,
            <FaUsersCog />
          ),
          getItem(
            <Link href={routes.dashboard.contacts.index}>
              {t.dashboard.menu.contacts}
            </Link>,
            routes.dashboard.contacts.index,
            <ContactsOutlined />
          ),
          getItem(
            <Link href={routes.dashboard.languages.index}>
              {t.dashboard.menu.languages}
            </Link>,
            routes.dashboard.languages.index,
            <BsPencilSquare />
          ),
        ],
        'group'
      ),
      DIVIDER,
      ...logoutItem,
    ],
    [Role.AUTHOR]: [
      ...groupingCommon(),
      DIVIDER,
      getItem(
        t.dashboard.menu.content,
        'content',
        <AppstoreOutlined />,
        [...articles, ...persons],
        'group'
      ),
      DIVIDER,
      ...logoutItem,
    ],
    [Role.EDITOR]: [
      ...groupingCommon(),
      DIVIDER,
      ...groupingContent(),
      DIVIDER,
      ...logoutItem,
    ],
    [Role.USER]: [
      ...groupingCommon(),
      DIVIDER,
      getItem(
        t.dashboard.menu.content,
        'content',
        <AppstoreOutlined />,
        [...persons],
        'group'
      ),
      DIVIDER,
      ...logoutItem,
    ],
  };

  const res = roleSpecificItems[me?.role || Role.USER] || common;
  return res as MenuItem[];
};
