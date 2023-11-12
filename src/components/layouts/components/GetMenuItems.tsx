import Link from 'next/link';
import {
  ContactsOutlined,
  FolderOpenOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
import { MdOutlinePlace } from 'react-icons/md';
import { FaNewspaper, FaRightFromBracket } from 'react-icons/fa6';
import { GoPeople } from 'react-icons/go';
import { FaUsers } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import React from 'react';
import { MenuProps } from 'antd/es/menu';
import { routes } from '@/common/routing/routes';
import { Role } from '@/types';

type MenuItem = Required<MenuProps>['items'][number];

const menuItems = {
  common: [
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
  ],
  articles: [
    {
      key: routes.dashboard.articles.index,
      label: <Link href={routes.dashboard.articles.index}>Articles</Link>,
      icon: <FaNewspaper />,
    },
  ],
  places: [
    {
      key: routes.dashboard.places.index,
      label: <Link href={routes.dashboard.places.index}>Places</Link>,
      icon: <MdOutlinePlace />,
    },
  ],
  persons: [
    {
      key: routes.dashboard.persons.index,
      label: <Link href={routes.dashboard.persons.index}>Persons</Link>,
      icon: <GoPeople />,
    },
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

export const GetMenuItems = (
  me?: { role: Role },
  onLogout?: () => void
): MenuItem[] => {
  const { common, articles, places, persons, logout } = menuItems;

  const roleSpecificItems = {
    [Role.ADMIN]: [
      ...common,
      {
        key: routes.dashboard.users.index,
        label: <Link href={routes.dashboard.users.index}>Users</Link>,
        icon: <FaUsers />,
      },
      ...articles,
      ...places,
      ...persons,
      {
        key: routes.dashboard.contacts.index,
        label: <Link href={routes.dashboard.contacts.index}>Contacts</Link>,
        icon: <ContactsOutlined />,
      },
      {
        key: routes.dashboard.languages.index,
        label: <Link href={routes.dashboard.languages.index}>Languages</Link>,
        icon: <BsPencilSquare />,
      },
      ...logout.map((item) => ({ ...item, onClick: onLogout })),
    ],
    [Role.AUTHOR]: [
      ...common,
      ...articles,
      ...places,
      ...persons,
      ...logout.map((item) => ({ ...item, onClick: onLogout })),
    ],
    [Role.EDITOR]: [
      ...common,
      ...articles,
      ...places,
      ...persons,
      ...logout.map((item) => ({ ...item, onClick: onLogout })),
    ],
    [Role.USER]: [
      ...common,
      ...persons,
      ...logout.map((item) => ({ ...item, onClick: onLogout })),
    ],
  };
  return roleSpecificItems[me?.role || Role.USER] || common;
};
