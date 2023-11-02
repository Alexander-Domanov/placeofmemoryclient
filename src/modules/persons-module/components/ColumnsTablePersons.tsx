import { ColumnsType } from 'antd/es/table';
import { Row, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IPerson } from '@/types';
import { RenderImage } from '@/common-dashboard/helpers/RenderImage';
import { ColorStatusTag } from '@/common-dashboard/helpers/ColorStatusTag';
import { routes } from '@/common/routing/routes';
import UpdatePersonStatusComponent from '@/modules/persons-module/components/UpdatePersonStatus';
import DeletePersonComponent from '@/modules/persons-module/components/DeletePerson';

export const columnsTablePersons: ColumnsType<IPerson> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 60,
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
    width: 60,
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
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: 150,
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
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    width: 150,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Birth Date',
    dataIndex: 'birthDate',
    key: 'birthDate',
    width: 110,
    align: 'center',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Death Date',
    dataIndex: 'deathDate',
    key: 'deathDate',
    width: 115,
    align: 'center',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 110,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 110,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'PlaceId',
    dataIndex: 'place',
    key: 'place',
    align: 'center',
    width: 80,
    render: (text, record) => (
      <Tooltip
        title={`name: ${record.place.name}`}
        placement="leftBottom"
        color="#1087f6"
      >
        <Typography.Text>{text.id}</Typography.Text>
      </Tooltip>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 130,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text: string) => ColorStatusTag(text),
  },
  {
    title: 'Photos',
    dataIndex: 'photos',
    key: 'photos',
    align: 'center',
    width: 80,
    render: (text, record: IPerson) => (
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
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    width: 90,
    render: (text, record) => (
      <Row justify="space-evenly">
        <UpdatePersonStatusComponent person={record} />
        <DeletePersonComponent person={record} />
      </Row>
    ),
  },
];
