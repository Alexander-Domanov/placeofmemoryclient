import { ColumnsType } from 'antd/es/table';
import { Row, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { ColorStatusTag, RenderImage } from '@/components';
import { IArticle } from '@/types';
import UpdateArticleStatusComponent from '@/modules/articles-module/components/UpdateArticleStatus';
import { routes } from '@/common/routing/routes';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import DeleteArticleComponent from '@/modules/articles-module/components/DeleteArticleModal';
import { LocaleType } from '@/components/internationalization';

export const ColumnsTableArticles = (t: LocaleType): ColumnsType<IArticle> => [
  {
    title: t.dashboard.articles.table.id,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    align: 'center',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: t.dashboard.articles.table.owner,
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
    title: t.dashboard.articles.table.title,
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    width: 280,
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
    title: t.dashboard.articles.table.createdAt,
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 80,
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
    title: t.dashboard.articles.table.updatedAt,
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 80,
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
    title: t.dashboard.articles.table.status,
    dataIndex: 'status',
    key: 'status',
    width: 60,
    align: 'center',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text: string) => ColorStatusTag(text),
  },
  {
    title: t.dashboard.articles.table.photos,
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
              {RenderImage(photo.versions.huge.url, 40, true)}
            </Typography.Text>
          </Tooltip>
        ))}
      </Row>
    ),
  },
  {
    title: t.dashboard.articles.table.actions,
    dataIndex: 'actions',
    key: 'actions',
    width: 80,
    align: 'center',
    render: (text, record) => (
      <Row justify="space-evenly">
        <UpdateArticleStatusComponent article={record} />

        <DeleteArticleComponent article={record} />
      </Row>
    ),
  },
];
