import { ColumnsType } from 'antd/es/table';
import { Row, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IPlace } from '@/types';
import { ColorStatusTag, RenderImage } from '@/components';
import UpdatePlaceStatus from '@/modules/places-module/components/UpdatePlaceStatus';
import { routes } from '@/common/routing/routes';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import DeletePlaceComponent from '@/modules/places-module/components/DeletePlaceModal';
import { LocaleType } from '@/components/internationalization';

export const ColumnsTablePlaces = (t: LocaleType): ColumnsType<IPlace> => [
  {
    title: t.dashboard.places.table.id,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    align: 'center',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: t.dashboard.places.table.owner,
    dataIndex: 'owner',
    key: 'ownerId',
    align: 'center',
    width: 80,
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
    title: t.dashboard.places.table.name,
    dataIndex: 'nameCemetery',
    key: 'nameCemetery',
    ellipsis: true,
    sorter: true,
    width: 250,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => (
      <Tooltip title={`${record.slug}`} placement="leftBottom" color="#1087f6">
        <Link
          href={{
            pathname: routes.dashboard.places.place(record.id),
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
    title: t.dashboard.places.table.country,
    dataIndex: 'country',
    key: 'country',
    width: 90,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: t.dashboard.places.table.city,
    dataIndex: 'city',
    key: 'city',
    width: 90,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: t.dashboard.places.table.createdAt,
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    width: 90,
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
    title: t.dashboard.places.table.updatedAt,
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 90,
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
    title: t.dashboard.places.table.status,
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 60,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text: string) => ColorStatusTag(text),
  },
  {
    title: t.dashboard.places.table.photos,
    dataIndex: 'photos',
    key: 'photos',
    align: 'center',
    width: 90,
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
              {RenderImage(photo.versions.huge.url, 40, true)}
            </Typography.Text>
          </Tooltip>
        ))}
      </Row>
    ),
  },
  {
    title: t.dashboard.places.table.persons,
    dataIndex: 'persons',
    key: 'persons',
    align: 'center',
    width: 70,
    render: (text, record) => (
      <Typography.Text>{record.personsLocation.length}</Typography.Text>
    ),
  },
  {
    title: t.dashboard.places.table.actions,
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    width: 80,
    render: (text, record) => (
      <Row justify="space-evenly">
        <UpdatePlaceStatus place={record} />

        <DeletePlaceComponent place={record} />
      </Row>
    ),
  },
];
