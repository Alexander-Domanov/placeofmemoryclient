import { ColumnsType } from 'antd/es/table';
import { Badge, Image, Row, Space, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IPerson } from '@/types';
import { ColorStatusTag } from '@/components';
import { routes } from '@/common/routing/routes';
import UpdatePersonStatusComponent from '@/modules/persons-module/components/UpdatePersonStatus';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import DeletePersonComponent from '@/modules/persons-module/components/DeletePersonModal';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';
import { LocaleType } from '@/components/internationalization';

export const ColumnsTablePersons = (t: LocaleType): ColumnsType<IPerson> => [
  {
    title: t.dashboard.persons.table.id,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    align: 'center',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: t.dashboard.persons.table.owner,
    dataIndex: 'owner',
    key: 'ownerId',
    align: 'center',
    width: 65,
    sorter: true,
    ellipsis: true,
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
    title: t.dashboard.persons.table.name,
    dataIndex: 'firstName',
    key: 'name',
    width: 100,
    ellipsis: true,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => (
      <Tooltip title={`${record.slug}`} placement="leftBottom" color="#1087f6">
        <Link
          href={{
            pathname: routes.dashboard.persons.person(record.id),
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
    title: t.dashboard.persons.table.lastName,
    dataIndex: 'lastName',
    key: 'lastName',
    width: 100,
    ellipsis: true,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: t.dashboard.persons.table.birthDate,
    dataIndex: 'birthDate',
    key: 'birthYear',
    width: 80,
    align: 'center',
    ellipsis: true,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    // render: (text: string) => convertDateToFormat(text, 'DD.MM.YYYY'),
  },
  {
    title: t.dashboard.persons.table.deathDate,
    dataIndex: 'deathDate',
    key: 'deathDate',
    width: 80,
    align: 'center',
    sorter: true,
    ellipsis: true,
    sortDirections: ['ascend', 'descend'],
    // render: (text: string) => convertDateToFormat(text, 'DD.MM.YYYY'),
  },
  {
    title: t.dashboard.persons.table.country,
    dataIndex: 'country',
    key: 'country',
    width: 80,
    align: 'center',
    ellipsis: true,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: t.dashboard.persons.table.city,
    dataIndex: 'city',
    key: 'city',
    width: 80,
    align: 'center',
    ellipsis: true,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: t.dashboard.persons.table.createdAt,
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 100,
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
    title: t.dashboard.persons.table.updatedAt,
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 100,
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
    title: t.dashboard.persons.table.placeId,
    dataIndex: 'place',
    key: 'place',
    align: 'center',
    width: 60,
    ellipsis: true,
    render: (text, record) => (
      <Tooltip
        title={`name: ${record.place.name}`}
        placement="leftBottom"
        color="#1087f6"
      >
        <span className="text-neutral-400">{text.id}</span>
      </Tooltip>
    ),
  },
  {
    title: t.dashboard.persons.table.status,
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 65,
    ellipsis: true,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text: string) => ColorStatusTag(text),
  },
  {
    title: t.dashboard.persons.table.photos,
    dataIndex: 'photos',
    key: 'photos',
    align: 'center',
    width: 80,
    ellipsis: true,
    render: (text, record: IPerson) => (
      <Image.PreviewGroup
        preview
        items={record.photos.map((photo) => ({
          src: photo.versions.huge.url,
        }))}
      >
        {/* <Tooltip */}
        {/*  title={`ID: ${record?.photos[0]?.uploadId}`} */}
        {/*  placement="leftBottom" */}
        {/*  color="#1087f6" */}
        {/*  key={record?.photos[0]?.uploadId} */}
        {/* > */}
        <Space size="middle">
          <Badge size="small" count={record?.photos.length}>
            <Image
              src={record?.photos[0]?.versions.huge.url}
              width={40}
              style={{ borderRadius: 4 }}
              fallback={pictureBackup}
            />
          </Badge>
        </Space>
        {/* </Tooltip> */}
      </Image.PreviewGroup>
    ),
  },
  {
    title: t.dashboard.persons.table.actions,
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    width: 80,
    ellipsis: true,
    render: (text, record) => (
      <Row justify="space-evenly">
        <UpdatePersonStatusComponent person={record} />
        <DeletePersonComponent person={record} />
      </Row>
    ),
  },
];
