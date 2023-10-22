import { Tag } from 'antd';

export const getColorRole = (role: string | null) => {
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

export const ColorRoleTag = (role: string | null) => {
  return (
    <Tag color={getColorRole(role).color} style={{ marginRight: 3 }}>
      {role}
    </Tag>
  );
};
