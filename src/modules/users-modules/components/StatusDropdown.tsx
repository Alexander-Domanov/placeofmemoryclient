import { useState } from 'react';
import { Dropdown, Menu, Space, Tag } from 'antd';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  LockOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { IUserWithShortExtensions } from '@/types';
import { useUpdateUserStatus } from '@/modules/users-modules/hooks/useUpdateUserStatus';

export const StatusDropdown: React.FC<Partial<IUserWithShortExtensions>> = (
  user
) => {
  const { id, status } = user;
  const [newStatus, setNewStatus] = useState(status);
  const [isStatusMenuOpen, setStatusMenuOpen] = useState(false);
  const {
    mutate: updateUserStatus,
    isLoading,
    isSuccess,
  } = useUpdateUserStatus();

  const handleMenuClick = (status: string) => {
    setStatusMenuOpen(false);
    setNewStatus(status);
    updateUserStatus({ id, status });
  };

  const getTagProps = (status: string | undefined) => {
    let color = 'default-color';
    let text = 'Unknown Status';
    let icon = <MinusCircleOutlined />;

    if (status === 'ACTIVE') {
      color = 'green';
      text = 'Active';
      icon = <CheckCircleOutlined />;
    } else if (status === 'BANNED') {
      color = 'red';
      text = 'Banned';
      icon = <LockOutlined />;
    } else if (status === 'PENDING') {
      color = 'geekblue';
      text = 'Pending';
      icon = <SyncOutlined spin />;
    }

    return { color, text, icon };
  };

  const statusTagProps = getTagProps(newStatus);

  const statusMenu = (
    <Menu onClick={({ key }) => handleMenuClick(key)}>
      <Menu.Item key="ACTIVE">
        <CheckCircleOutlined /> Active
      </Menu.Item>
      <Menu.Item key="BANNED">
        <LockOutlined /> Banned
      </Menu.Item>
      <Menu.Item key="DELETED">
        <DeleteOutlined /> Deleted
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown
        overlay={statusMenu}
        trigger={['hover']}
        open={isStatusMenuOpen}
        onOpenChange={setStatusMenuOpen}
      >
        <Tag color={statusTagProps.color} className="ant-dropdown-link">
          <Space size={2} align="center">
            {statusTagProps.icon} {statusTagProps.text}
            <DownOutlined />
          </Space>
        </Tag>
      </Dropdown>
    </div>
  );
};
