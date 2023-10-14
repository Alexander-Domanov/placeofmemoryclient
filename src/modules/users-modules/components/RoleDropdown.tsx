import { useState } from 'react';
import { Dropdown, Menu, Tag } from 'antd';
import {
  DoubleRightOutlined,
  DownOutlined,
  FormOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { IUser } from '@/types';
import { useUpdateUserRole } from '@/modules/users-modules/hooks/useUpdateUserRole';

export const RoleDropdown: React.FC<Partial<IUser>> = (user) => {
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
        <DoubleRightOutlined /> Editor
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
        onOpenChange={setRoleMenuOpen}
      >
        <Tag color={roleTagProps.color} className="ant-dropdown-link">
          {roleTagProps.text}
        </Tag>
      </Dropdown>
    </div>
  );
};
