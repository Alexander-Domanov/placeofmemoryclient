import React, { useEffect, useState } from 'react';
import { Button, Form, List, Modal, notification, Select } from 'antd';
import {
  CheckCircleOutlined,
  DownOutlined,
  EditOutlined,
  FormOutlined,
  LockOutlined,
  SolutionOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { IUser, IUserWithShortExtensions } from '@/types';
import { useUpdateUserRole } from '@/modules/users-module/hooks/useUpdateUserRole';
import { useUpdateUserStatus } from '@/modules/users-module/hooks/useUpdateUserStatus';

const { Option } = Select;

interface DeleteUserComponentProps {
  user: IUserWithShortExtensions | IUser | null;
  showButton: boolean;
}
const UpdateUserStatusAndRoleComponent: React.FC<DeleteUserComponentProps> = ({
  user,
  showButton,
}) => {
  const { id, role, status } = user || { id: null, role: null, status: null };
  const [isModalVisible, setModalVisible] = useState(false);
  const [newRole, setNewRole] = useState(role);
  const [newStatus, setNewStatus] = useState(status);

  const { mutate: updateUserRole, isRoleUpdating } = useUpdateUserRole();
  const { mutate: updateUserStatus, isStatusUpdating } = useUpdateUserStatus();

  useEffect(() => {
    setNewRole(role);
    setNewStatus(status);
  }, [user]);

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleMenuRoleClick = (role: string) => {
    setNewRole(role);
    updateUserRole(
      { id, role },
      {
        onSuccess: () => {
          notification.success({
            message: `Changed role to: ${role} for user: ${user?.userName}`,
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const handleMenuStatusClick = (status: string) => {
    setNewStatus(status);
    updateUserStatus(
      { id, status },
      {
        onSuccess: () => {
          notification.success({
            message: `Changed status to: ${status} for user: ${user?.userName}`,
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const showButtonDelete = (showButton: boolean) => {
    const handleEditClick = () => {
      setModalVisible(true);
    };

    if (showButton) {
      return (
        <Button
          type="default"
          title="Update user status and role"
          icon={<EditOutlined />}
          style={{ cursor: 'pointer', color: '#2c332c' }}
          onClick={handleEditClick}
        >
          Update
        </Button>
      );
    }
    return (
      <Button
        key={0}
        icon={<EditOutlined />}
        style={{ cursor: 'pointer', color: '#2c332c' }}
        onClick={handleEditClick}
        ghost
      />
    );
  };

  return (
    <>
      <List.Item actions={[showButtonDelete(showButton)]} />
      <Modal
        title="Change user role or status:"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <br />
        <Form.Item label="Current role" style={{ marginBottom: 10 }}>
          <Select
            value={newRole}
            onChange={handleMenuRoleClick}
            loading={isRoleUpdating}
            disabled={isRoleUpdating}
          >
            <Option value="ADMIN">
              <UpOutlined /> Admin
            </Option>

            <Option value="EDITOR">
              <SolutionOutlined /> Editor
            </Option>

            <Option value="AUTHOR">
              <FormOutlined /> Author
            </Option>

            <Option value="USER">
              <DownOutlined /> User
            </Option>
          </Select>
        </Form.Item>

        <Form.Item label="Current status" style={{ marginBottom: 10 }}>
          <Select
            value={newStatus}
            onChange={handleMenuStatusClick}
            loading={isStatusUpdating}
            disabled={isStatusUpdating}
          >
            <Option value="ACTIVE">
              <CheckCircleOutlined /> Active
            </Option>

            <Option value="BANNED">
              <LockOutlined /> Banned
            </Option>
          </Select>
        </Form.Item>
      </Modal>
    </>
  );
};

export default UpdateUserStatusAndRoleComponent;
