import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const renderAvatar = (
  url: string | null | undefined,
  size: number
  // record: IUser
  // openModal: (record: IUser) => void
) =>
  url ? (
    <Avatar
      src={url}
      size={size}
      icon={<UserOutlined />}
      // onClick={() => openModal(record)}
      style={{ cursor: 'pointer' }}
    />
  ) : (
    <Avatar
      size={size}
      icon={<UserOutlined />}
      // onClick={() => openModal(record)}
      style={{ cursor: 'pointer' }}
    />
  );
