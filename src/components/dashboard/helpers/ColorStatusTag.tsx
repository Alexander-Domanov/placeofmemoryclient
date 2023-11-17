import { Tag, Tooltip } from 'antd';
import {
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Statuses } from '@/types';

export const getColorStatus = (status: string | null) => {
  let color = 'default-color';
  let text = 'Unknown Status';
  let icon = <MinusCircleOutlined />;
  if (status === Statuses.DRAFT) {
    color = 'red';
    text = 'Draft';
    icon = <EyeInvisibleOutlined />;
  } else if (status === Statuses.PENDING_REVIEW) {
    color = 'geekblue';
    text = 'Sent for review';
    icon = <ClockCircleOutlined />;
  } else if (status === Statuses.PUBLISHED) {
    color = 'green';
    text = 'Published';
    icon = <EyeOutlined />;
  } else if (status === Statuses.ARCHIVED) {
    color = 'lightgrey';
    text = 'Archived';
    icon = <InboxOutlined />;
  }
  return { color, text, icon };
};

export const ColorStatusTag = (status: string | null) => {
  const statusTagProps = getColorStatus(status);
  return (
    <Tooltip title={`${status}`} placement="leftBottom" color="#1087f6">
      <Tag color={statusTagProps.color} className="ant-dropdown-link">
        {statusTagProps.icon}
      </Tag>
    </Tooltip>
  );
};
