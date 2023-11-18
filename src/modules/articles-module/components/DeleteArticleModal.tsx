import { FC, useState } from 'react';
import { Button, List, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { IArticle } from '@/types';
import { useDeleteArticle } from '@/modules/articles-module/hooks/useDeleteArticle';
import { routes } from '@/common/routing/routes';

interface DeleteArticleModalProps {
  article: IArticle | null;
}
const DeleteArticleComponent: FC<DeleteArticleModalProps> = ({ article }) => {
  const router = useRouter();

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<IArticle | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleClick = () => {
    setSelectedArticle(article);
    showDeleteModal();
  };

  const buttonStyle = {
    cursor: 'pointer',
    color: '#ef2020',
  };

  return (
    <>
      <List.Item
        key={article?.id}
        actions={[
          <Button
            key="delete"
            title="Delete"
            icon={<DeleteOutlined />}
            style={buttonStyle}
            onClick={handleClick}
            ghost
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
        okButtonProps={{
          icon: <DeleteOutlined />,
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
          style: {
            cursor: 'pointer',
            color: isHovered ? '#fff' : '#ef2020',
            backgroundColor: isHovered ? '#ef2020' : 'transparent',
            border: isHovered ? '1px solid #ef2020' : '1px solid #d9d9d9',
          },
        }}
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

export default DeleteArticleComponent;
