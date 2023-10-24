import { ColumnsType } from 'antd/es/table';
import { Row, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { ColorStatusPlaceTag } from '@/modules/places-module/components/helpers/ColorStatusPlaceTag';
import { IArticle } from '@/types/articles/article.type';
import { RenderImage } from '@/modules/users-module/components/helpers/RenderAvatar';
import DeleteArticleComponent from '@/modules/articles-module/components/DeleteArticle';
import UpdateArticleStatusComponent from '@/modules/articles-module/components/UpdateArticleStatus';
import { routes } from '@/common/routing/routes';

export const columnsTableArticles: ColumnsType<IArticle> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text) => (
      <Row justify="space-evenly">
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
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => (
      <Tooltip
        title={`${record.description}`}
        placement="leftBottom"
        color="#1087f6"
      >
        <Link
          href={{
            pathname: routes.dashboard.articles.article('[id]'),
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
    render: (text, record: IArticle) => (
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
    title: 'Edit/Delete',
    dataIndex: 'actions',
    key: 'actions',
    render: (text, record) => (
      <Row justify="space-evenly">
        <UpdateArticleStatusComponent article={record} />
        <DeleteArticleComponent article={record} />
      </Row>
    ),
  },
];
