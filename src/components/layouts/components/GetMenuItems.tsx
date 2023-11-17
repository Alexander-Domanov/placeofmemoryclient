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

const menuItems = {
  common: [
    getItem(
      <Link href={routes.dashboard.index}>Map</Link>,
      routes.dashboard.index,
      <GrMapLocation />
    ),
    getItem(
      <Link href={routes.dashboard.gallery.index}>Gallery</Link>,
      routes.dashboard.gallery.index,
      <IoImagesOutline />
    ),
  ],
  articles: [
    getItem(
      <Link href={routes.dashboard.articles.index}>Articles</Link>,
      routes.dashboard.articles.index,
      <FaNewspaper />
    ),
  ],
  places: [
    getItem(
      <Link href={routes.dashboard.places.index}>Places</Link>,
      routes.dashboard.places.index,
      <GiCandleFlame />
    ),
  ],
  persons: [
    getItem(
      <Link href={routes.dashboard.persons.index}>Persons</Link>,
      routes.dashboard.persons.index,
      <FaPeopleGroup />
    ),
  ],
  logout: [
    {
      key: 'logout',
      label: 'Logout',
      icon: <FaRightFromBracket />,
      danger: true,
    },
  ],
};

const groupingCommon = (): MenuItem[] => {
  const { common } = menuItems;
  return [
    getItem(
      'Dashboard',
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
      'Content',
      'content',
      <AppstoreOutlined />,
      [...articles, ...places, ...persons],
      'group'
    ),
  ];
};

export const GetMenuItems = (
  me?: { role: Role },
  onLogout?: () => void
): MenuItem[] => {
  const { common, persons, articles, logout } = menuItems;

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
        'Settings',
        'settings',
        <SettingOutlined />,
        [
          getItem(
            <Link href={routes.dashboard.users.index}>Users</Link>,
            routes.dashboard.users.index,
            <FaUsersCog />
          ),
          getItem(
            <Link href={routes.dashboard.contacts.index}>Contacts</Link>,
            routes.dashboard.contacts.index,
            <ContactsOutlined />
          ),
          getItem(
            <Link href={routes.dashboard.languages.index}>Languages</Link>,
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
        'Content',
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
        'Content',
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
