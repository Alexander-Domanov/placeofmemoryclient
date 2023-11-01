import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import React from 'react';
import { routes } from '@/common/routing/routes';

export const BREAD_CRUMBS_LANGUAGE: Partial<
  BreadcrumbItemType & BreadcrumbSeparatorType
>[] = [
  {
    key: routes.dashboard.index,
    title: <Link href={routes.dashboard.index}>Dashboard</Link>,
  },
  {
    key: routes.dashboard.language.index,
    title: 'Language',
  },
];
