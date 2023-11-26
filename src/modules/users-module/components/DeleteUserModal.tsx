import React, { useState } from 'react';
import { Button, List, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { IUser, IUserWithShortExtensions } from '@/types';
import { useDeleteUser } from '@/modules/users-module/hooks/useDeleteUser';
import { useTranslation } from '@/components/internationalization';
import { routes } from '@/common/routing/routes';

interface DeleteUserModalProps {
  user: IUser | IUserWithShortExtensions | null;
}

const DeleteUserComponent: React.FC<DeleteUserModalProps> = ({ user }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<
    IUser | IUserWithShortExtensions | null
  >(null);
  const [isHovered, setIsHovered] = useState(false);

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
          message: t.dashboard.users.notifications.delete.title,
          placement: 'bottomLeft',
        });
        router.push(routes.dashboard.users.index);
      },
    });
    setDeleteModalVisible(false);
  };

  const buttonStyle = {
    cursor: 'pointer',
    color: '#ef2020',
  };

  const handleClick = () => {
    setSelectedUser(user);
    showDeleteModal();
  };

  return (
    <>
      <List.Item
        key={user?.id}
        actions={[
          <Button
            key="delete"
            title={t.dashboard.users.delete.title}
            icon={<DeleteOutlined />}
            style={buttonStyle}
            onClick={handleClick}
            ghost
          />,
        ]}
      />

      <Modal
        title={t.dashboard.users.delete.titleConfirm}
        open={isDeleteModalVisible}
        onOk={deleteUser}
        onCancel={handleDeleteCancel}
        okText={t.dashboard.users.delete.delete}
        cancelText={t.dashboard.users.delete.cancel}
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
              {t.dashboard.users.delete.description}: &nbsp;
            </span>
            {selectedUser?.userName}
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DeleteUserComponent;
