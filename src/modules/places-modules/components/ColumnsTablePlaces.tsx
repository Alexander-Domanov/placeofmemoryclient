import { ColumnsType } from 'antd/es/table';
import { Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IPlace } from '@/types';

export const columnsTablePlaces: ColumnsType<IPlace> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => (
      <Tooltip title={`ID: ${text}`} placement="leftBottom" color="#1087f6">
        <Typography.Text>
          {/* {RenderAvatarImage(record.avatars?.thumbnail.url, 20, record)} */}
          {text}
        </Typography.Text>
      </Tooltip>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'nameCemetery',
    key: 'nameCemetery',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => (
      <Link
        href={{
          pathname: '/dashboard/places/[id]',
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
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    // render: (text: string) => ColorStatusUserTag(text),
  },
  // {
  //   title: 'View Profile',
  //   dataIndex: 'view profile',
  //   key: 'view profile',
  //   render: (text, record) => <UserDrawer onUserSelected={record} />,
  // },
  // {
  //   title: 'Edit',
  //   dataIndex: 'edit',
  //   key: 'edit',
  //   render: (text, record) => <UpdateUserComponent user={record} />,
  // },
  // {
  //   title: 'Delete',
  //   dataIndex: 'delete',
  //   key: 'delete',
  //   render: (text, record) => <DeleteUserComponent user={record} />,
  // },
];
