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
import { useRouter } from 'next/router';
import { IUser, IUserWithShortExtensions } from '@/types';
import { useUpdateUserRole } from '@/modules/users-module/hooks/useUpdateUserRole';
import { useUpdateUserStatus } from '@/modules/users-module/hooks/useUpdateUserStatus';
import { routes } from '@/common/routing/routes';
import { useTranslation } from '@/components/internationalization';

const { Option } = Select;

interface DeleteUserComponentProps {
  user: IUserWithShortExtensions | IUser | null;
  showButton: boolean;
  showEditButton?: boolean;
}
const UpdateUserStatusAndRoleComponent: React.FC<DeleteUserComponentProps> = ({
  user,
  showButton,
  showEditButton = true,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

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
            message:
              t.dashboard.users.updateModal.notification.updateRole.success,
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
            message:
              t.dashboard.users.updateModal.notification.updateStatus.success,
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
          title={t.dashboard.users.updateModal.button.title}
          icon={<EditOutlined />}
          style={{ cursor: 'pointer', color: '#2c332c' }}
          onClick={handleEditClick}
        >
          {t.dashboard.users.updateModal.button.update}
        </Button>
      );
    }
    return (
      <Button
        key={0}
        title={t.dashboard.users.updateModal.button.title}
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
        title={t.dashboard.users.updateModal.title}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <br />
        <Form.Item
          label={t.dashboard.users.updateModal.form.label}
          style={{ marginBottom: 10 }}
        >
          <Select
            value={newRole}
            onChange={handleMenuRoleClick}
            loading={isRoleUpdating}
            disabled={isRoleUpdating}
          >
            <Option value="ADMIN">
              <UpOutlined /> {t.dashboard.users.selectRole.admin}
            </Option>

            <Option value="EDITOR">
              <SolutionOutlined /> {t.dashboard.users.selectRole.editor}
            </Option>

            <Option value="AUTHOR">
              <FormOutlined /> {t.dashboard.users.selectRole.author}
            </Option>

            <Option value="USER">
              <DownOutlined /> {t.dashboard.users.selectRole.user}
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={t.dashboard.users.updateModal.form.label2}
          style={{ marginBottom: 10 }}
        >
          <Select
            value={newStatus}
            onChange={handleMenuStatusClick}
            loading={isStatusUpdating}
            disabled={isStatusUpdating}
          >
            <Option value="ACTIVE">
              <CheckCircleOutlined /> {t.dashboard.users.selectStatus.active}
            </Option>

            <Option value="BANNED">
              <LockOutlined /> {t.dashboard.users.selectStatus.banned}
            </Option>
          </Select>
        </Form.Item>

        {showEditButton && (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              router.push(routes.dashboard.users.user(id || ''));
            }}
          >
            {t.dashboard.users.updateModal.edit}
          </Button>
        )}
      </Modal>
    </>
  );
};

export default UpdateUserStatusAndRoleComponent;
