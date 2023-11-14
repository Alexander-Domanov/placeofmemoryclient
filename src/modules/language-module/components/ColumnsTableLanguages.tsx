import { ColumnsType } from 'antd/es/table';
import { Row, Typography } from 'antd';
import React from 'react';
import { ILanguageListItem } from '@/types';
import DeleteLanguageComponent from '@/modules/language-module/components/DeleteLanguage';
import UpdateLanguage from '@/modules/language-module/components/UpdateLanguege';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';

export const columnsTableLanguages: ColumnsType<ILanguageListItem> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <Typography.Text ellipsis>{text}</Typography.Text>,
  },
  {
    title: 'Native',
    dataIndex: 'native',
    key: 'native',
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
    render: (text) => (
      <Typography.Text ellipsis style={{ color: '#1087f6' }}>
        {text}
      </Typography.Text>
    ),
  },
  {
    title: 'Order',
    dataIndex: 'order',
    key: 'order',
    align: 'center',
  },
  {
    title: 'Сreated At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    render: (text: string) => convertDateToFormat(text),
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    align: 'center',
    render: (text: string) => convertDateToFormat(text),
  },

  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    render: (text, record) => (
      <Row justify="space-evenly">
        <UpdateLanguage language={record} />
        <DeleteLanguageComponent language={record} />
      </Row>
    ),
  },
];
