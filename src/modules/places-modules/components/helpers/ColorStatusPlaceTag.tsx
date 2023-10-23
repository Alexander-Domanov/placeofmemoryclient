import { Space, Tag } from 'antd';
import {
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

export const getColorStatusPlace = (status: string | null) => {
  let color = 'default-color';
  let text = 'Unknown Status';
  let icon = <MinusCircleOutlined />;
  if (status === 'DRAFT') {
    color = 'red';
    text = 'Draft';
    icon = <EyeInvisibleOutlined />;
  } else if (status === 'PENDING_REVIEW') {
    color = 'geekblue';
    text = 'Pending';
    icon = <ClockCircleOutlined />;
  } else if (status === 'PUBLISHED') {
    color = 'green';
    text = 'Published';
    icon = <EyeOutlined />;
  } else if (status === 'ARCHIVED') {
    color = 'lightgrey';
    text = 'Archived';
    icon = <InboxOutlined />;
  }
  return { color, text, icon };
};

export const ColorStatusPlaceTag = (status: string | null) => {
  const statusTagProps = getColorStatusPlace(status);
  return (
    <Tag color={statusTagProps.color} className="ant-dropdown-link">
      <Space size={2} align="center">
        {statusTagProps.icon} {statusTagProps.text}
      </Space>
    </Tag>
  );
};
