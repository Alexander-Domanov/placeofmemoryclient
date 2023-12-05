import { Tag, Tooltip } from 'antd';
import {
  CheckCircleTwoTone,
  LockTwoTone,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { LocaleType, useTranslation } from '@/components/internationalization';
import { StatusUser } from '@/types';

export const getColorStatusUser = (status: string | null, t: LocaleType) => {
  let color = 'default-color';
  let text = 'Unknown Status';
  let icon = <MinusCircleOutlined />;

  if (status === StatusUser.ACTIVE) {
    color = 'green';
    text = t.dashboard.users.selectStatus.active;
    icon = <CheckCircleTwoTone twoToneColor="#74c782" />;
  } else if (status === StatusUser.BANNED) {
    color = 'red';
    text = t.dashboard.users.selectStatus.banned;
    icon = <LockTwoTone twoToneColor="#f5222d" />;
  } else if (status === StatusUser.PENDING) {
    color = 'geekblue';
    text = t.dashboard.users.selectStatus.pending;
    icon = <SyncOutlined spin />;
  }

  return { color, text, icon };
};

export const ColorStatusUserTag = (
  status: string | null,
  isStatus: boolean
) => {
  const { t } = useTranslation();
  const statusTagProps = getColorStatusUser(status, t);
  return isStatus ? (
    <Tooltip
      title={`${statusTagProps.text}`}
      placement="leftBottom"
      color="#1087f6"
    >
      <Tag color={statusTagProps.color} className="ant-dropdown-link">
        {statusTagProps.icon} {statusTagProps.text}
      </Tag>
    </Tooltip>
  ) : (
    <Tooltip
      title={`${statusTagProps.text}`}
      placement="leftBottom"
      color="#1087f6"
    >
      {statusTagProps.icon}
    </Tooltip>
  );
};
