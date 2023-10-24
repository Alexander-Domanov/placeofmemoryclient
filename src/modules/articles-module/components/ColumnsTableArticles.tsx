import { ColumnsType } from 'antd/es/table';
import { Row, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { ColorStatusTag } from '@/common-dashboard/helpers/ColorStatusTag';
import { IArticle } from '@/types/articles/article.type';
import { RenderImage } from '@/common-dashboard/helpers/RenderImage';
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
    align: 'center',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'ownerId',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    align: 'center',
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
    align: 'center',
    render: (text: string) => ColorStatusTag(text),
  },
  {
    title: 'Photos',
    dataIndex: 'photos',
    key: 'photos',
    align: 'center',
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
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    render: (text, record) => (
      <Row justify="space-evenly">
        <UpdateArticleStatusComponent article={record} />
        <DeleteArticleComponent article={record} />
      </Row>
    ),
  },
];
