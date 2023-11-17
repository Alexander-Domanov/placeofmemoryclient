import React, { useState } from 'react';
import { Button, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { IArticle } from '@/types';
import { useDeleteArticle } from '@/modules/articles-module/hooks/useDeleteArticle';
import { routes } from '@/common/routing/routes';

interface DeleteArticleModalProps {
  article: IArticle | null;
  showButton: boolean;
}
const DeleteArticleModal: React.FC<DeleteArticleModalProps> = ({
  article,
  showButton,
}) => {
  const router = useRouter();

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<IArticle | null>(null);

  const { deleteArticleMutation } = useDeleteArticle();

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };
  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const deletePlace = () => {
    deleteArticleMutation(selectedArticle?.id || null, {
      onSuccess: () => {
        notification.success({
          message: `Article: ${selectedArticle?.title} deleted successfully`,
          placement: 'bottomLeft',
        });
        router.push(routes.dashboard.articles.index);
      },
    });
    setDeleteModalVisible(false);
  };

  const showButtonDelete = (showButton: boolean) => {
    const handleClick = () => {
      setSelectedArticle(article);
      showDeleteModal();
    };

    const buttonStyle = {
      cursor: 'pointer',
      color: '#ef2020',
    };

    if (showButton) {
      return (
        <Button
          danger
          type="primary"
          title="Delete"
          icon={<DeleteOutlined />}
          style={buttonStyle}
          onClick={handleClick}
          ghost
        >
          Delete
        </Button>
      );
    }
    return (
      <Button
        title="Delete"
        icon={<DeleteOutlined />}
        style={buttonStyle}
        onClick={handleClick}
        ghost
      />
    );
  };

  return (
    <>
      {showButtonDelete(showButton)}
      <Modal
        title="Confirm deletion"
        open={isDeleteModalVisible}
        onOk={deletePlace}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <Space>
          <div className="site-description-item-profile-wrapper">
            <span className="text-neutral-400">
              Are you sure you want to delete the article: &nbsp;
            </span>
            {selectedArticle?.title}
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DeleteArticleModal;
