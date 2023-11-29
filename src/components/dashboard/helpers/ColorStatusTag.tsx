import { Tag, Tooltip } from 'antd';
import {
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Statuses } from '@/types';
import { LocaleType, useTranslation } from '@/components/internationalization';

export const getColorStatus = (status: string | null, t: LocaleType) => {
  let color = 'default-color';
  let text = 'Unknown Status';
  let icon = <MinusCircleOutlined />;
  if (status === Statuses.DRAFT) {
    color = 'red';
    text = t.dashboard.selectStatus.draft;
    icon = <EyeInvisibleOutlined />;
  } else if (status === Statuses.PENDING_REVIEW) {
    color = 'geekblue';
    text = t.dashboard.selectStatus.pending;
    icon = <ClockCircleOutlined />;
  } else if (status === Statuses.PUBLISHED) {
    color = 'green';
    text = t.dashboard.selectStatus.published;
    icon = <EyeOutlined />;
  } else if (status === Statuses.ARCHIVED) {
    color = 'lightgrey';
    text = t.dashboard.selectStatus.archived;
    icon = <InboxOutlined />;
  }
  return { color, text, icon };
};

export const ColorStatusTag = (status: string | null) => {
  const { t } = useTranslation();
  const statusTagProps = getColorStatus(status, t);
  return (
    <Tooltip
      title={`${statusTagProps.text}`}
      placement="leftBottom"
      color="#1087f6"
    >
      <Tag color={statusTagProps.color} className="ant-dropdown-link">
        {statusTagProps.icon}
      </Tag>
    </Tooltip>
  );
};
