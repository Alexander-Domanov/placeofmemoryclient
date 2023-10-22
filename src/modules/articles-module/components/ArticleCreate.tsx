import { FC } from 'react';
import { Breadcrumb, Flex } from 'antd';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { routes } from '@/common/routing/routes';

export const ArticleCreate: FC = () => {
  const breadcrumbs: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [
    {
      key: routes.dashboard.index,
      title: <Link href={routes.dashboard.index}>Dashboard</Link>,
    },
    {
      key: routes.dashboard.articles.index,
      title: <Link href={routes.dashboard.articles.index}>Articles</Link>,
    },
    {
      key: routes.dashboard.articles.create,
      title: 'Create Article',
    },
  ];

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <div />
    </Flex>
  );
};
