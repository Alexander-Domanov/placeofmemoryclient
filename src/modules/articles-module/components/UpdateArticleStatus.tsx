import React, { useState } from 'react';
import { Button, Form, List, Modal, notification, Select } from 'antd';
import {
  ClockCircleOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { IArticle, Statuses } from '@/types';
import { useUpdateArticleStatus } from '@/modules/articles-module/hooks/useUpdateArticleStatus';
import { routes } from '@/common/routing/routes';

const { Option } = Select;

interface Props {
  article: IArticle | null;
}
const UpdateArticleStatusComponent: React.FC<Props> = ({ article }) => {
  const router = useRouter();

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
        title="Change status of article or edit"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form.Item label="Change status">
          <Select value={newStatus} onChange={handleMenuStatusClick}>
            <Option value={Statuses.DRAFT}>
              <EyeInvisibleOutlined /> Draft
            </Option>
            <Option value={Statuses.PENDING_REVIEW}>
              <ClockCircleOutlined /> Send for review
            </Option>
            <Option value={Statuses.PUBLISHED}>
              <EyeOutlined /> Publish
            </Option>
            <Option value={Statuses.ARCHIVED}>
              <InboxOutlined /> Archive
            </Option>
          </Select>
        </Form.Item>

        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => {
            router.push(routes.dashboard.articles.article(id || ''));
          }}
        >
          Edit
        </Button>
      </Modal>
    </>
  );
};

export default UpdateArticleStatusComponent;
