import React from 'react';
import {
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { Select } from 'antd';
import { Role } from '@/types';

const { Option } = Select;

export const GetUpdateOptions = (me?: { role: Role }) => {
  const isAdminOrEditor = me?.role === Role.ADMIN || me?.role === Role.EDITOR;
  if (isAdminOrEditor) {
    return [
      <Option key="DRAFT" value="DRAFT">
        <EyeInvisibleOutlined /> Draft
      </Option>,
      <Option key="PENDING_REVIEW" value="PENDING_REVIEW">
        <ClockCircleOutlined /> Send for review
      </Option>,
      <Option key="PUBLISHED" value="PUBLISHED">
        <EyeOutlined /> Publish
      </Option>,
      <Option key="ARCHIVED" value="ARCHIVED">
        <InboxOutlined /> Archive
      </Option>,
    ];
  }

  return [
    <Option key="DRAFT" value="DRAFT">
      <EyeInvisibleOutlined /> Draft
    </Option>,
    <Option key="PENDING_REVIEW" value="PENDING_REVIEW">
      <ClockCircleOutlined /> Send for review
    </Option>,
    <Option key="PUBLISHED" value="PUBLISHED">
      <EyeOutlined /> Publish
    </Option>,
  ];
};
