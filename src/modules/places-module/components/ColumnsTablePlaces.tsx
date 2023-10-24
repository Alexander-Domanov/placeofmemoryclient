import { ColumnsType } from 'antd/es/table';
import { Row, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IPlace } from '@/types';
import { RenderImage } from '@/modules/users-module/components/helpers/RenderAvatar';
import DeletePlaceComponent from '@/modules/places-module/components/DeletePlace';
import UpdatePlaceStatusComponent from '@/modules/places-module/components/UpdatePlaceStatus';
import { ColorStatusPlaceTag } from '@/modules/places-module/components/helpers/ColorStatusPlaceTag';
import { routes } from '@/common/routing/routes';

export const columnsTablePlaces: ColumnsType<IPlace> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text) => (
      <Row justify="space-around">
        <Typography.Text>{text}</Typography.Text>
      </Row>
    ),
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'ownerId',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => (
      <Row justify="space-around">
        <Tooltip
          title={`name: ${record.owner.userName}`}
          placement="leftBottom"
          color="#1087f6"
        >
          <Typography.Text>{text.id}</Typography.Text>
        </Tooltip>
      </Row>
    ),
  },

  {
    title: 'Name',
    dataIndex: 'nameCemetery',
    key: 'nameCemetery',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => (
      <Tooltip
        title={`${record.shortDescription}`}
        placement="leftBottom"
        color="#1087f6"
      >
        <Link
          href={{
            pathname: routes.dashboard.places.place('[id]'),
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
    render: (text: string) => ColorStatusPlaceTag(text),
  },
  {
    title: 'Photos',
    dataIndex: 'photos',
    key: 'photos',
    render: (text, record: IPlace) => (
      <Row justify="space-evenly">
        {record.photos.map((photo, index) => (
          <Tooltip
            title={`ID: ${photo.uploadId}`}
            placement="leftBottom"
            color="#1087f6"
            key={index}
          >
            <Typography.Text key={index}>
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
    render: (text, record) => (
      <Row justify="space-around">
        <Typography.Text>{record.personsLocation.length}</Typography.Text>
      </Row>
    ),
  },
  {
    title: 'Edit/Delete',
    dataIndex: 'actions',
    key: 'actions',
    render: (text, record) => (
      <Row justify="space-evenly">
        <UpdatePlaceStatusComponent place={record} />
        <DeletePlaceComponent place={record} />
      </Row>
    ),
  },
];
