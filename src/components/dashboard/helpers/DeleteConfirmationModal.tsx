import { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface DeleteConfirmationModalProps<T> {
  item: T | null;
  onDelete: (item: T | null) => void;
  disabled?: boolean;
}

export function DeleteConfirmationModal<T>({
  item,
  onDelete,
  disabled,
}: DeleteConfirmationModalProps<T>) {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const confirmDeletion = () => {
    onDelete(item);
    setDeleteModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        danger
        title="Delete"
        icon={<DeleteOutlined />}
        style={{
          cursor: 'pointer',
          color: '#ef2020',
          ...(disabled && { opacity: 0.5, cursor: 'not-allowed' }),
        }}
        disabled={disabled}
        onClick={showDeleteModal}
        ghost
      >
        Delete
      </Button>

      <Modal
        title="Confirm deletion"
        open={isDeleteModalVisible}
        onOk={confirmDeletion}
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
              Are you sure you want to delete this item?
            </span>
          </div>
        </Space>
      </Modal>
    </>
  );
}
