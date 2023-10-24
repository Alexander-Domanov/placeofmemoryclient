import React, { useState } from 'react';
import {
  Button,
  Divider,
  Dropdown,
  List,
  Menu,
  Modal,
  notification,
  Space,
  Tag,
} from 'antd';
import {
  ClockCircleOutlined,
  DownOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { getColorStatus } from '@/common-dashboard/helpers/ColorStatusTag';
import { IArticle } from '@/types/articles/article.type';
import { useUpdateArticleStatus } from '@/modules/articles-module/hooks/useUpdateArticleStatus';

interface UpdateArticleStatusComponentProps {
  article: IArticle | null;
}
const UpdateArticleStatusComponent: React.FC<
  UpdateArticleStatusComponentProps
> = ({ article }) => {
  const { id, status } = article || { id: null, status: null };
  const [isModalVisible, setModalVisible] = useState(false);
  const [isStatusMenuOpen, setStatusMenuOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  const { updateStatusArticle } = useUpdateArticleStatus();

  const handleEditClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleMenuStatusClick = (status: string) => {
    setStatusMenuOpen(false);
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

  const statusMenu = (
    <Menu onClick={({ key }) => handleMenuStatusClick(key)}>
      <Menu.Item key="DRAFT">
        <EyeInvisibleOutlined /> Draft
      </Menu.Item>
      <Menu.Item key="PENDING_REVIEW">
        <ClockCircleOutlined /> Send for review
      </Menu.Item>
      <Menu.Item key="PUBLISHED">
        <EyeOutlined /> Publish
      </Menu.Item>
      <Menu.Item key="ARCHIVED">
        <InboxOutlined /> Archive
      </Menu.Item>
    </Menu>
  );

  const statusTagProps = getColorStatus(newStatus);

  return (
    <>
      <List.Item
        actions={[
          <Button
            key={0}
            icon={<EditOutlined />}
            style={{ cursor: 'pointer', color: '#2c332c' }}
            onClick={handleEditClick}
            ghost
          />,
        ]}
      />
      <Modal
        title="Change status"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Divider orientation="center">
          Status:{' '}
          <Dropdown
            overlay={statusMenu}
            trigger={['hover']}
            open={isStatusMenuOpen}
            arrow
            onOpenChange={setStatusMenuOpen}
          >
            <Tag color={statusTagProps.color} className="ant-dropdown-link">
              <Space size={2} align="center">
                {statusTagProps.text}
                <DownOutlined />
              </Space>
            </Tag>
          </Dropdown>
        </Divider>
      </Modal>
    </>
  );
};

export default UpdateArticleStatusComponent;
