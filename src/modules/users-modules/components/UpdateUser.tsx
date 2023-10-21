import React, { useState } from 'react';
import {
  Button,
  Divider,
  Dropdown,
  List,
  Menu,
  Modal,
  notification,
  Space,
  Tag,
} from 'antd';
import {
  CheckCircleOutlined,
  DownOutlined,
  EditOutlined,
  FormOutlined,
  LockOutlined,
  SolutionOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { IUserWithShortExtensions } from '@/types';
import { useUpdateUserRole } from '@/modules/users-modules/hooks/useUpdateUserRole';
import { getColorRole } from '@/modules/users-modules/components/helpers/ColorRoleTag';
import { getColorStatusUser } from '@/modules/users-modules/components/helpers/ColorStatusUserTag';
import { useUpdateUserStatus } from '@/modules/users-modules/hooks/useUpdateUserStatus';

interface DeleteUserComponentProps {
  user: IUserWithShortExtensions | null;
}
const UpdateUserComponent: React.FC<DeleteUserComponentProps> = ({ user }) => {
  const { id, role, status } = user || { id: null, role: null, status: null };
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRoleMenuOpen, setRoleMenuOpen] = useState(false);
  const [isStatusMenuOpen, setStatusMenuOpen] = useState(false);
  const [newRole, setNewRole] = useState(role);
  const [newStatus, setNewStatus] = useState(status);

  const { mutate: updateUserRole } = useUpdateUserRole();
  const { mutate: updateUserStatus } = useUpdateUserStatus();

  const handleEditClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleMenuRoleClick = (role: string) => {
    setRoleMenuOpen(false);
    setNewRole(role);
    updateUserRole({ id, role });
    notification.success({
      message: `Changed role to: ${role} for user: ${user?.userName}`,
      placement: 'bottomLeft',
    });
  };

  const handleMenuStatusClick = (status: string) => {
    setStatusMenuOpen(false);
    setNewStatus(status);
    updateUserStatus({ id, status });
    notification.success({
      message: `Changed status to: ${status} for user: ${user?.userName}`,
      placement: 'bottomLeft',
    });
  };

  const menuRole = (
    <Menu onClick={({ key }) => handleMenuRoleClick(key)}>
      <Menu.Item key="ADMIN">
        <UpOutlined /> Admin
      </Menu.Item>
      <Menu.Item key="EDITOR">
        <SolutionOutlined /> Editor
      </Menu.Item>
      <Menu.Item key="AUTHOR">
        <FormOutlined /> Author
      </Menu.Item>
      <Menu.Item key="USER">
        <DownOutlined /> User
      </Menu.Item>
    </Menu>
  );

  const statusMenu = (
    <Menu onClick={({ key }) => handleMenuStatusClick(key)}>
      <Menu.Item key="ACTIVE">
        <CheckCircleOutlined /> Active
      </Menu.Item>
      <Menu.Item key="BANNED">
        <LockOutlined /> Banned
      </Menu.Item>
    </Menu>
  );

  const roleTagProps = getColorRole(newRole);
  const statusTagProps = getColorStatusUser(newStatus);

  return (
    <>
      <List.Item
        actions={[
          <Button
            key={0}
            icon={<EditOutlined />}
            style={{ cursor: 'pointer', color: '#2c332c' }}
            onClick={handleEditClick}
            ghost
          />,
        ]}
      />
      <Modal
        title="Change user role and status"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Divider orientation="center" style={{ marginBottom: '25px' }}>
          Role:{' '}
          <Dropdown
            overlay={menuRole}
            trigger={['hover']}
            open={isRoleMenuOpen}
            arrow
            onOpenChange={setRoleMenuOpen}
          >
            <Tag color={roleTagProps.color} className="ant-dropdown-link">
              <Space size={2} align="center">
                {roleTagProps.text}
                <DownOutlined />
              </Space>
            </Tag>
          </Dropdown>
        </Divider>
        <Divider orientation="center">
          Status:
          <Dropdown
            overlay={statusMenu}
            trigger={['hover']}
            open={isStatusMenuOpen}
            arrow
            onOpenChange={setStatusMenuOpen}
          >
            <Tag color={statusTagProps.color} className="ant-dropdown-link">
              <Space size={2} align="center">
                {statusTagProps.text}
                <DownOutlined />
              </Space>
            </Tag>
          </Dropdown>
        </Divider>
      </Modal>
    </>
  );
};

export default UpdateUserComponent;
