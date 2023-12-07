import { ColumnsType } from 'antd/es/table';
import { Row, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IUserWithShortExtensions } from '@/types';
import { RenderImage } from '@/components';
import { ColorStatusUserTag } from '@/modules/users-module/components/helpers/ColorStatusUserTag';
import { ColorRoleTag } from '@/modules/users-module/components/helpers/ColorRoleTag';
import { UserDrawer } from '@/modules/users-module/components/UserDrawer';
import { routes } from '@/common/routing/routes';
import UpdateUserStatusAndRoleComponent from '@/modules/users-module/components/UpdateUserStatusAndRole';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import { LocaleType } from '@/components/internationalization';
import DeleteUserComponent from '@/modules/users-module/components/DeleteUserModal';

export const ColumnsTableUsers = (
  t: LocaleType
): ColumnsType<IUserWithShortExtensions> => [
  {
    dataIndex: 'id',
    title: t.dashboard.users.table.avatar,
    key: 'id',
    width: 40,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => (
      <Tooltip title={`ID: ${text}`} placement="leftBottom" color="#1087f6">
        <Typography.Text>
          {RenderImage(record.avatars?.thumbnail.url, 25)}
        </Typography.Text>
      </Tooltip>
    ),
  },
  {
    title: t.dashboard.users.table.name,
    dataIndex: 'userName',
    key: 'userName',
    width: 130,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => (
      <Link href={{ pathname: routes.dashboard.users.user(record.id) }}>
        <Typography.Text
          ellipsis
          style={{ cursor: 'pointer', color: '#1087f6' }}
        >
          {text}
        </Typography.Text>
      </Link>
    ),
  },
  {
    title: t.dashboard.users.table.email,
    dataIndex: 'email',
    key: 'email',
    width: 250,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: t.dashboard.users.table.createdAt,
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
    sorter: true,
    align: 'center',
    sortDirections: ['ascend', 'descend'],
    render: (text: string) => (
      <Typography.Text>
        {convertDateToFormat(text, 'DD.MM.YYYY')} &nbsp;
        <span className="text-neutral-400">
          {convertDateToFormat(text, 'HH:mm')}
        </span>
      </Typography.Text>
    ),
  },
  {
    title: t.dashboard.users.table.status,
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 70,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text: string) => ColorStatusUserTag(text, false),
  },
  {
    title: t.dashboard.users.table.role,
    dataIndex: 'role',
    key: 'role',
    align: 'center',
    width: 100,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text: string) => ColorRoleTag(text),
  },
  {
    title: t.dashboard.users.table.view,
    dataIndex: 'view profile',
    key: 'view profile',
    align: 'center',
    width: 100,
    render: (text, record) => (
      <Row justify="space-around">
        <UserDrawer onUserSelected={record} />
      </Row>
    ),
  },
  {
    title: t.dashboard.users.table.actions,
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    width: 90,
    render: (text, record) => (
      <Row justify="space-evenly">
        <UpdateUserStatusAndRoleComponent user={record} showButton={false} />

        <DeleteUserComponent user={record} />
      </Row>
    ),
  },
];
