import { useState } from 'react';
import { Dropdown, Menu, Space, Tag } from 'antd';
import {
  DownOutlined,
  FormOutlined,
  SolutionOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { IUserWithShortExtensions } from '@/types';
import { useUpdateUserRole } from '@/modules/users-modules/hooks/useUpdateUserRole';

export const RoleDropdown: React.FC<Partial<IUserWithShortExtensions>> = (
  user
) => {
  const { id, role } = user;
  const [newRole, setNewRole] = useState(role);
  const [isRoleMenuOpen, setRoleMenuOpen] = useState(false);
  const { mutate: updateUserRole, isLoading, isSuccess } = useUpdateUserRole();

  const handleMenuClick = (role: string) => {
    setRoleMenuOpen(false);
    setNewRole(role);
    updateUserRole({ id, role });
  };

  const getTagProps = (role: string | undefined) => {
    let color = 'default-color';
    const text = role || 'Unknown Role';
    if (role === 'ADMIN') {
      color = 'gold';
    } else if (role === 'EDITOR') {
      color = 'geekblue';
    } else if (role === 'AUTHOR') {
      color = 'green';
    } else if (role === 'USER') {
      color = 'lightgrey';
    }
    return { color, text };
  };

  const roleTagProps = getTagProps(newRole);

  const roleMenu = (
    <Menu onClick={({ key }) => handleMenuClick(key)}>
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

  return (
    <div>
      <Dropdown
        overlay={roleMenu}
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
    </div>
  );
};
