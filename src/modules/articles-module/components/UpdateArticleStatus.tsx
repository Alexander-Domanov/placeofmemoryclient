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
import { useTranslation } from '@/components/internationalization';

const { Option } = Select;

interface Props {
  article: IArticle | null;
}
const UpdateArticleStatusComponent: React.FC<Props> = ({ article }) => {
  const router = useRouter();
  const { t } = useTranslation();

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
            message: t.dashboard.articles.updateModal.notification.success,
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
            title={t.dashboard.articles.updateModal.buttonTitle}
            icon={<EditOutlined />}
            onClick={handleEditClick}
            type="text"
          />,
        ]}
      />

      <Modal
        title={t.dashboard.articles.updateModal.title}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form.Item label={t.dashboard.articles.updateModal.form.label}>
          <Select value={newStatus} onChange={handleMenuStatusClick}>
            <Option value={Statuses.DRAFT}>
              <EyeInvisibleOutlined />{' '}
              {t.dashboard.articles.updateModal.form.status.draft}
            </Option>
            <Option value={Statuses.PENDING_REVIEW}>
              <ClockCircleOutlined />{' '}
              {t.dashboard.articles.updateModal.form.status.pending}
            </Option>
            <Option value={Statuses.PUBLISHED}>
              <EyeOutlined />{' '}
              {t.dashboard.articles.updateModal.form.status.published}
            </Option>
            <Option value={Statuses.ARCHIVED}>
              <InboxOutlined />{' '}
              {t.dashboard.articles.updateModal.form.status.archived}
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
          {t.dashboard.articles.updateModal.edit}
        </Button>
      </Modal>
    </>
  );
};

export default UpdateArticleStatusComponent;
