import { Space, Tag } from 'antd';
import {
  CheckCircleOutlined,
  LockOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

export const getColorStatusUser = (status: string | null) => {
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

export const ColorStatusUserTag = (status: string | null) => {
  const statusTagProps = getColorStatusUser(status);
  return (
    <Tag color={statusTagProps.color} className="ant-dropdown-link">
      <Space size={2} align="center">
        {statusTagProps.icon}
      </Space>
    </Tag>
  );
};
