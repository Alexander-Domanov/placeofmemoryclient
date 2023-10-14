import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IAvatarVersions } from '@/types';

export const renderAvatar = (
  avatars: IAvatarVersions | null | undefined,
  size: number
  // record: IUser
  // openModal: (record: IUser) => void
) =>
  avatars ? (
    <Avatar
      src={avatars.thumbnail?.url}
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
