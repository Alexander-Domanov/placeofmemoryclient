import { ColumnsType } from 'antd/es/table';
import { Row, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IPlace } from '@/types';
import { RenderImage } from '@/common-dashboard/helpers/RenderImage';
import DeletePlaceComponent from '@/modules/places-module/components/DeletePlace';
import UpdatePlaceStatus from '@/modules/places-module/components/UpdatePlaceStatus';
import { ColorStatusTag } from '@/common-dashboard/helpers/ColorStatusTag';
import { routes } from '@/common/routing/routes';

export const columnsTablePlaces: ColumnsType<IPlace> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    align: 'center',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'ownerId',
    align: 'center',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => (
      <Tooltip
        title={`name: ${record.owner.userName}`}
        placement="leftBottom"
        color="#1087f6"
      >
        <Typography.Text>{text.id}</Typography.Text>
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
      <Tooltip title={`${record.slug}`} placement="leftBottom" color="#1087f6">
        <Link
          href={{
            pathname: routes.dashboard.places.place(record.id),
            // query: { id: record.id },
          }}
        >
          <Typography.Text
            ellipsis
            style={{ cursor: 'pointer', color: '#1087f6' }}
          >
            {text}
          </Typography.Text>
        </Link>
      </Tooltip>
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
    align: 'center',
    render: (text: string) => ColorStatusTag(text),
  },
  {
    title: 'Photos',
    dataIndex: 'photos',
    key: 'photos',
    align: 'center',
    render: (text, record: IPlace) => (
      <Row justify="space-evenly">
        {record.photos.map((photo, index) => (
          <Tooltip
            title={`ID: ${photo.uploadId}`}
            placement="leftBottom"
            color="#1087f6"
            key={index}
          >
            <Typography.Text>
              {RenderImage(photo.versions.huge.url, 30, true)}
            </Typography.Text>
          </Tooltip>
        ))}
      </Row>
    ),
  },
  {
    title: 'Persons',
    dataIndex: 'persons',
    key: 'persons',
    align: 'center',
    render: (text, record) => (
      <Typography.Text>{record.personsLocation.length}</Typography.Text>
    ),
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    render: (text, record) => (
      <Row justify="space-evenly">
        <UpdatePlaceStatus place={record} />
        <DeletePlaceComponent place={record} />
      </Row>
    ),
  },
];
