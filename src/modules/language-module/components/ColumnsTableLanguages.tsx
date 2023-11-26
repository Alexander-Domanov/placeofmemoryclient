import { ColumnsType } from 'antd/es/table';
import { Row, Typography } from 'antd';
import React from 'react';
import { ILanguageListItem } from '@/types';
import UpdateLanguage from '@/modules/language-module/components/UpdateLanguege';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import { LocaleType } from '@/components/internationalization';
import DeleteLanguageComponent from '@/modules/language-module/components/DeleteLanguageModal';

export const ColumnsTableLanguages = (
  t: LocaleType
): ColumnsType<ILanguageListItem> => [
  {
    title: t.dashboard.languages.table.id,
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: t.dashboard.languages.table.name,
    dataIndex: 'name',
    key: 'name',
    render: (text) => <Typography.Text ellipsis>{text}</Typography.Text>,
  },
  {
    title: t.dashboard.languages.table.native,
    dataIndex: 'native',
    key: 'native',
  },
  {
    title: t.dashboard.languages.table.code,
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
    title: t.dashboard.languages.table.order,
    dataIndex: 'order',
    key: 'order',
    align: 'center',
  },
  {
    title: t.dashboard.languages.table.createdAt,
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
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
    title: t.dashboard.languages.table.updatedAt,
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    align: 'center',
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
    title: t.dashboard.languages.table.actions,
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
