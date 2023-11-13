import React, { useState } from 'react';
import { Button, Form, List, Modal, notification, Select } from 'antd';
import {
  ClockCircleOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { IArticle } from '@/types';
import { useUpdateArticleStatus } from '@/modules/articles-module/hooks/useUpdateArticleStatus';

const { Option } = Select;

interface Props {
  article: IArticle | null;
}
const UpdateArticleStatusComponent: React.FC<Props> = ({ article }) => {
  const { id, status } = article || { id: null, status: null };
  const [isModalVisible, setModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  const { updateStatusArticle } = useUpdateArticleStatus();

  const handleEditClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleMenuStatusClick = (status: string) => {
    setNewStatus(status);
    updateStatusArticle(
      { id, status },
      {
        onSuccess: () => {
          notification.success({
            message: `Changed status to: ${status} for article: ${article?.title}`,
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  return (
    <>
      <List.Item
        actions={[
          <Button
            key={0}
            title="Change status of article"
            icon={<EditOutlined />}
            onClick={handleEditClick}
            type="text"
          />,
        ]}
      />

      <Modal
        title="Change status"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form.Item label="Current Status">
          <Select value={newStatus} onChange={handleMenuStatusClick}>
            <Option value="DRAFT">
              <EyeInvisibleOutlined /> Draft
            </Option>
            <Option value="PENDING_REVIEW">
              <ClockCircleOutlined /> Send for review
            </Option>
            <Option value="PUBLISHED">
              <EyeOutlined /> Publish
            </Option>
            <Option value="ARCHIVED">
              <InboxOutlined /> Archive
            </Option>
          </Select>
        </Form.Item>
      </Modal>
    </>
  );
};

export default UpdateArticleStatusComponent;
