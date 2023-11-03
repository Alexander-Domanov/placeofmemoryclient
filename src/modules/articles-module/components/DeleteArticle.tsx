import React, { useState } from 'react';
import { Button, List, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { IArticle } from '@/types/articles/article.type';
import { useDeleteArticle } from '@/modules/articles-module/hooks/useDeleteArticle';

interface DeleteArticleComponentProps {
  article: IArticle | null;
}
const DeleteArticleComponent: React.FC<DeleteArticleComponentProps> = ({
  article,
}) => {
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
      },
    });
    setDeleteModalVisible(false);
  };

  return (
    <>
      <List.Item
        actions={[
          <Button
            key={0}
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedArticle(article);
              showDeleteModal();
            }}
            type="text"
            danger
          />,
        ]}
      />
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
            <span className="font-normal text-neutral-400">
              Are you sure you want to delete the article:{' '}
            </span>
            <span className="font-normal text-start">
              {selectedArticle?.title}
            </span>
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DeleteArticleComponent;
