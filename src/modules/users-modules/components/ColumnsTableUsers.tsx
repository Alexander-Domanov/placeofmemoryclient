import { ColumnsType } from 'antd/es/table';
import { Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IUserWithShortExtensions } from '@/types';
import { RenderAvatarImage } from '@/modules/users-modules/components/helpers/RenderAvatar';
import { ColorStatusUserTag } from '@/modules/users-modules/components/helpers/ColorStatusUserTag';
import { ColorRoleTag } from '@/modules/users-modules/components/helpers/ColorRoleTag';
import { UserDrawer } from '@/modules/users-modules/components/UserDrawer';
import UpdateUserComponent from '@/modules/users-modules/components/UpdateUser';
import DeleteUserComponent from '@/modules/users-modules/components/DeleteUser';

export const columnsTableUsers: ColumnsType<IUserWithShortExtensions> = [
  {
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => (
      <Tooltip title={`ID: ${text}`} placement="leftBottom" color="#1087f6">
        <Typography.Text>
          {RenderAvatarImage(record.avatars?.thumbnail.url, 20)}
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
      <Link
        href={{
          pathname: '/dashboard/users/[id]',
          query: { id: record.id },
        }}
      >
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
    render: (text: string) => ColorStatusUserTag(text),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (text: string) => ColorRoleTag(text),
  },
  {
    title: 'View Profile',
    dataIndex: 'view profile',
    key: 'view profile',
    render: (text, record) => <UserDrawer onUserSelected={record} />,
  },
  {
    title: 'Edit',
    dataIndex: 'edit',
    key: 'edit',
    render: (text, record) => <UpdateUserComponent user={record} />,
  },
  {
    title: 'Delete',
    dataIndex: 'delete',
    key: 'delete',
    render: (text, record) => <DeleteUserComponent user={record} />,
  },
];