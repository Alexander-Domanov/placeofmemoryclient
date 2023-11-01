import { ColumnsType } from 'antd/es/table';
import { Row, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IUserWithShortExtensions } from '@/types';
import { RenderImage } from '@/common-dashboard/helpers/RenderImage';
import { ColorStatusUserTag } from '@/modules/users-module/components/helpers/ColorStatusUserTag';
import { ColorRoleTag } from '@/modules/users-module/components/helpers/ColorRoleTag';
import { UserDrawer } from '@/modules/users-module/components/UserDrawer';
import DeleteUserComponent from '@/modules/users-module/components/DeleteUser';
import { routes } from '@/common/routing/routes';
import UpdateUserStatusAndRoleComponent from '@/modules/users-module/components/UpdateUserStatusAndRole';

export const columnsTableUsers: ColumnsType<IUserWithShortExtensions> = [
  {
    dataIndex: 'id',
    key: 'id',
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
    title: 'Name',
    dataIndex: 'userName',
    key: 'userName',
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
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (text: string) => ColorStatusUserTag(text, false),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    align: 'center',
    render: (text: string) => ColorRoleTag(text),
  },
  {
    title: 'View Profile',
    dataIndex: 'view profile',
    key: 'view profile',
    align: 'center',
    render: (text, record) => (
      <Row justify="space-around">
        <UserDrawer onUserSelected={record} />
      </Row>
    ),
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    render: (text, record) => (
      <Row justify="space-evenly">
        <UpdateUserStatusAndRoleComponent user={record} />
        <DeleteUserComponent user={record} />
      </Row>
    ),
  },
];
