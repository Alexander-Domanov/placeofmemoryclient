import { Tag } from 'antd';
import { LocaleType, useTranslation } from '@/components/internationalization';

export const getColorRole = (role: string | null, t: LocaleType) => {
  let color = 'default-color';
  let text = 'Unknown Role';
  if (role === 'ADMIN') {
    color = 'gold';
    text = t.dashboard.users.selectRole.admin;
  } else if (role === 'EDITOR') {
    color = 'geekblue';
    text = t.dashboard.users.selectRole.editor;
  } else if (role === 'AUTHOR') {
    color = 'green';
    text = t.dashboard.users.selectRole.author;
  } else if (role === 'USER') {
    color = 'lightgrey';
    text = t.dashboard.users.selectRole.user;
  }
  return { color, text };
};

export const ColorRoleTag = (role: string | null) => {
  const { t } = useTranslation();
  const roleTagProps = getColorRole(role, t);
  return (
    <Tag color={roleTagProps.color} style={{ marginRight: 3 }}>
      {roleTagProps.text}
    </Tag>
  );
};
