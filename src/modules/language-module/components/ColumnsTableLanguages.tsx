import { ColumnsType } from 'antd/es/table';
import { Row, Typography } from 'antd';
import React from 'react';
import { ILanguageListItem } from '@/types';
import DeleteLanguageComponent from '@/modules/language-module/components/DeleteLanguage';
import UpdateLanguage from '@/modules/language-module/components/UpdateLanguege';

export const columnsTableLanguages: ColumnsType<ILanguageListItem> = [
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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => (
      <Typography.Text ellipsis style={{ cursor: 'pointer', color: '#1087f6' }}>
        {text}
      </Typography.Text>
    ),
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
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
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
