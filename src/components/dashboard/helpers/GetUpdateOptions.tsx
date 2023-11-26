import React from 'react';
import {
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { Select } from 'antd';
import { Role, Statuses } from '@/types';
import { LocaleType } from '@/components/internationalization';

const { Option } = Select;

export const GetUpdateOptions = (t: LocaleType, me?: { role: Role }) => {
  const isAdminOrEditor = me?.role === Role.USER || me?.role === Role.AUTHOR;
  if (isAdminOrEditor) {
    return [
      <Option key={Statuses.DRAFT} value={Statuses.DRAFT}>
        <EyeInvisibleOutlined /> {t.dashboard.updateStatus.draft}
      </Option>,
      <Option key={Statuses.PENDING_REVIEW} value={Statuses.PENDING_REVIEW}>
        <ClockCircleOutlined /> {t.dashboard.updateStatus.pending}
      </Option>,
    ];
  }

  return [
    <Option key={Statuses.DRAFT} value={Statuses.DRAFT}>
      <EyeInvisibleOutlined /> {t.dashboard.updateStatus.draft}
    </Option>,
    <Option key={Statuses.PENDING_REVIEW} value={Statuses.PENDING_REVIEW}>
      <ClockCircleOutlined /> {t.dashboard.updateStatus.pending}
    </Option>,
    <Option key={Statuses.PUBLISHED} value={Statuses.PUBLISHED}>
      <EyeOutlined /> {t.dashboard.updateStatus.published}
    </Option>,
    <Option key={Statuses.ARCHIVED} value={Statuses.ARCHIVED}>
      <InboxOutlined /> {t.dashboard.updateStatus.archived}
    </Option>,
  ];
};
