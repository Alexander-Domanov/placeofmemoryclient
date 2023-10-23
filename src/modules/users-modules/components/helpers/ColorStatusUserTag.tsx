import { Row, Tag } from 'antd';
import {
  CheckCircleTwoTone,
  LockTwoTone,
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
    icon = <CheckCircleTwoTone twoToneColor="#74c782" />;
  } else if (status === 'BANNED') {
    color = 'red';
    text = 'Banned';
    icon = <LockTwoTone twoToneColor="#f5222d" />;
  } else if (status === 'PENDING') {
    color = 'geekblue';
    text = 'Pending';
    icon = <SyncOutlined spin />;
  }

  return { color, text, icon };
};

export const ColorStatusUserTag = (
  status: string | null,
  isStatus: boolean
) => {
  const statusTagProps = getColorStatusUser(status);
  return isStatus ? (
    <Tag color={statusTagProps.color} className="ant-dropdown-link">
      {statusTagProps.icon} {statusTagProps.text}
    </Tag>
  ) : (
    <Row justify="space-around">{statusTagProps.icon}</Row>
  );
};
