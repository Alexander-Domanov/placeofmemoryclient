import { ColumnsType } from 'antd/es/table';
import { Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IPlace } from '@/types';
import { RenderAvatarImage } from '@/modules/users-modules/components/helpers/RenderAvatar';
import DeletePlaceComponent from '@/modules/places-modules/components/DeletePlace';
import UpdatePlaceStatusComponent from '@/modules/places-modules/components/UpdatePlaceStatus';
import { ColorStatusPlaceTag } from '@/modules/places-modules/components/helpers/ColorStatusPlaceTag';

export const columnsTablePlaces: ColumnsType<IPlace> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text) => <Typography.Text>{text}</Typography.Text>,
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
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
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
    render: (text: string) => ColorStatusPlaceTag(text),
  },
  {
    title: 'Photos',
    dataIndex: 'photos',
    key: 'photos',
    render: (text, record) => (
      <Tooltip
        title={`ID: ${record.photos[0]?.uploadId}`}
        placement="leftBottom"
        color="#1087f6"
      >
        <Typography.Text>
          {RenderAvatarImage(record.photos[0]?.versions.huge.url, 30, true)}
        </Typography.Text>
      </Tooltip>
    ),
  },
  {
    title: 'Persons',
    dataIndex: 'persons',
    key: 'persons',
    render: (text, record) => (
      <Typography.Text>{record.personsLocation.length}</Typography.Text>
    ),
  },
  {
    title: 'Edit',
    dataIndex: 'edit',
    key: 'edit',
    render: (text, record) => <UpdatePlaceStatusComponent place={record} />,
  },
  {
    title: 'Delete',
    dataIndex: 'delete',
    key: 'delete',
    render: (text, record) => <DeletePlaceComponent place={record} />,
  },
];
