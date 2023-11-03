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
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';

export const columnsTableArticles: ColumnsType<IArticle> = [
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
    width: 80,
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
    ellipsis: true,
    width: 300,
    render: (text, record) => (
      <Tooltip title={`${record.slug}`} placement="leftBottom" color="#1087f6">
        <Link href={`${routes.dashboard.articles.article(record.id)}`}>
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
    width: 110,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text: string) => convertDateToFormat(text),
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 110,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text: string) => convertDateToFormat(text),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 130,
    align: 'center',
    render: (text: string) => ColorStatusTag(text),
  },
  {
    title: 'Photos',
    dataIndex: 'photos',
    key: 'photos',
    width: 80,
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
    width: 90,
    align: 'center',
    render: (text, record) => (
      <Row justify="space-evenly">
        <UpdateArticleStatusComponent article={record} />

        <DeleteArticleComponent article={record} />
      </Row>
    ),
  },
];
