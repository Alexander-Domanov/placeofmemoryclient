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
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';

export const columnsTableUsers: ColumnsType<IUserWithShortExtensions> = [
  {
    dataIndex: 'id',
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
    title: 'Name',
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
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 250,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
    sorter: true,
    align: 'center',
    sortDirections: ['ascend', 'descend'],
    render: (text: string) => convertDateToFormat(text),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 70,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text: string) => ColorStatusUserTag(text, false),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    align: 'center',
    width: 100,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text: string) => ColorRoleTag(text),
  },
  {
    title: 'View Profile',
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
    title: 'Actions',
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
