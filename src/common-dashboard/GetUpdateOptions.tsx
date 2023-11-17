import React from 'react';
import {
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { Select } from 'antd';
import { Role, Statuses } from '@/types';

const { Option } = Select;

export const GetUpdateOptions = (me?: { role: Role }) => {
  const isAdminOrEditor = me?.role === Role.USER || me?.role === Role.AUTHOR;
  if (isAdminOrEditor) {
    return [
      <Option key={Statuses.DRAFT} value={Statuses.DRAFT}>
        <EyeInvisibleOutlined /> Draft
      </Option>,
      <Option key={Statuses.PENDING_REVIEW} value={Statuses.PENDING_REVIEW}>
        <ClockCircleOutlined /> Send for review
      </Option>,
    ];
  }

  return [
    <Option key={Statuses.DRAFT} value={Statuses.DRAFT}>
      <EyeInvisibleOutlined /> Draft
    </Option>,
    <Option key={Statuses.PENDING_REVIEW} value={Statuses.PENDING_REVIEW}>
      <ClockCircleOutlined /> Send for review
    </Option>,
    <Option key={Statuses.PUBLISHED} value={Statuses.PUBLISHED}>
      <EyeOutlined /> Publish
    </Option>,
    <Option key={Statuses.ARCHIVED} value={Statuses.ARCHIVED}>
      <InboxOutlined /> Archive
    </Option>,
  ];
};
