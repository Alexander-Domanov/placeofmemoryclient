import React, { useState } from 'react';
import { Button, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { IUser, IUserWithShortExtensions } from '@/types';
import { useDeleteUser } from '@/modules/users-module/hooks/useDeleteUser';

interface DeleteUserModalProps {
  user: IUser | IUserWithShortExtensions | null;
  showButton: boolean;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  user,
  showButton,
}) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<
    IUser | IUserWithShortExtensions | null
  >(null);
  const { deleteUserMutation } = useDeleteUser();

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const deleteUser = () => {
    deleteUserMutation(selectedUser?.id || null, {
      onSuccess: () => {
        notification.success({
          message: `User: ${selectedUser?.userName} deleted successfully`,
          placement: 'bottomLeft',
        });
      },
    });
    setDeleteModalVisible(false);
  };

  const showButtonDelete = (showButton: boolean) => {
    const handleClick = () => {
      setSelectedUser(user);
      showDeleteModal();
    };

    if (showButton) {
      return (
        <Button
          danger
          type="primary"
          title="Delete"
          icon={<DeleteOutlined />}
          style={{ cursor: 'pointer', color: '#ef2020' }}
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
        style={{ cursor: 'pointer', color: '#ef2020' }}
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
        onOk={deleteUser}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <Space>
          <div className="site-description-item-profile-wrapper">
            <span className="font-normal text-neutral-400">
              Are you sure you want to delete the user:{' '}
            </span>
            <span className="font-normal text-start">
              {selectedUser?.userName}
            </span>
          </div>
        </Space>
      </Modal>
      <Modal
        title="Confirm deletion"
        open={isDeleteModalVisible}
        onOk={deleteUser}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <Space>
          <div className="site-description-item-profile-wrapper">
            <span className="font-normal text-neutral-400">
              Are you sure you want to delete the user:{' '}
            </span>
            <span className="font-normal text-start">
              {selectedUser?.userName}
            </span>
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DeleteUserModal;
