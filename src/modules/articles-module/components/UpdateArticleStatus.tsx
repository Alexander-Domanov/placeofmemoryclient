import React, { useEffect, useState } from 'react';
import { Button, Form, List, Modal, notification, Select } from 'antd';
import {
  ClockCircleOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { IArticle, Statuses, StatusUser } from '@/types';
import { useUpdateArticleStatus } from '@/modules/articles-module/hooks/useUpdateArticleStatus';
import { routes } from '@/common/routing/routes';
import { useTranslation } from '@/components/internationalization';
import { useMeQuery } from '@/services';

const { Option } = Select;

interface Props {
  article: IArticle | null;
}
const UpdateArticleStatusComponent: React.FC<Props> = ({ article }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: me } = useMeQuery();

  const { id, status } = article || { id: null, status: null };
  const [isModalVisible, setModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(status);
  const [isDisabled, setIsDisabled] = useState(false);

  const { updateStatusArticle } = useUpdateArticleStatus();

  useEffect(() => {
    if (me?.status === StatusUser.BANNED) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [me?.status]);

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
          <Select
            value={newStatus}
            onChange={handleMenuStatusClick}
            disabled={isDisabled}
          >
            <Option value={Statuses.DRAFT}>
              <EyeInvisibleOutlined /> {t.dashboard.updateStatus.draft}
            </Option>
            <Option value={Statuses.PENDING_REVIEW}>
              <ClockCircleOutlined /> {t.dashboard.updateStatus.pending}
            </Option>
            <Option value={Statuses.PUBLISHED}>
              <EyeOutlined /> {t.dashboard.updateStatus.published}
            </Option>
            <Option value={Statuses.ARCHIVED}>
              <InboxOutlined /> {t.dashboard.updateStatus.archived}
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
