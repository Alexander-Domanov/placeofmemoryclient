import { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from '@/components/internationalization';

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
  const { t } = useTranslation();
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
        title={t.dashboard.delete.title}
        icon={<DeleteOutlined />}
        style={{
          cursor: 'pointer',
          ...(disabled && { opacity: 0.5, cursor: 'not-allowed' }),
        }}
        disabled={disabled}
        onClick={showDeleteModal}
      >
        {t.dashboard.delete.title}
      </Button>

      <Modal
        title={t.dashboard.delete.titleConfirm}
        open={isDeleteModalVisible}
        onOk={confirmDeletion}
        onCancel={handleDeleteCancel}
        okText={t.dashboard.delete.delete}
        cancelText={t.dashboard.delete.cancel}
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
              {t.dashboard.delete.description}
            </span>
          </div>
        </Space>
      </Modal>
    </>
  );
}
