import React, { useState } from 'react';
import { Button, Flex, List, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteUser } from '@/modules/users-module/hooks/useDeleteUser';
import { IUserWithShortExtensions } from '@/types';

interface DeleteUserComponentProps {
  user: IUserWithShortExtensions | null;
}
const DeleteUserComponent: React.FC<DeleteUserComponentProps> = ({ user }) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<IUserWithShortExtensions | null>(null);

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

  return (
    <Flex gap="large" vertical>
      <List.Item
        actions={[
          <Button
            key={0}
            icon={<DeleteOutlined />}
            style={{ cursor: 'pointer', color: '#ef2020' }}
            onClick={() => {
              setSelectedUser(user);
              showDeleteModal();
            }}
            ghost
          />,
        ]}
      />

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
    </Flex>
  );
};

export default DeleteUserComponent;
