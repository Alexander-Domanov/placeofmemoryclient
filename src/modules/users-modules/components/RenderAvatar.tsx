import { Avatar, Badge, Image, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IUserWithShortExtensions } from '@/types';

export const renderAvatarImage = (
  url: string | null | undefined,
  size: number,
  record: IUserWithShortExtensions | null,
  isPreview = false
  // openModal: (record: IUser) => void
) => {
  const countAll =
    (record?.places?.pendingReview.length || 0) +
    (record?.persons?.pendingReview.length || 0) +
    (record?.articles?.pendingReview.length || 0);
  return url ? (
    <Space size={24}>
      <Badge count={countAll} size="default">
        <Image
          src={url}
          width={size}
          preview={isPreview}
          style={{ borderRadius: 5 }}
          // onClick={() => openModal(record)}
          // style={{ cursor: 'pointer' }}
        />
      </Badge>
    </Space>
  ) : (
    <Avatar
      shape="square"
      size={size}
      icon={<UserOutlined />}
      // style={{ borderRadius: '50%', cursor: 'pointer' }}
      // onClick={() => openModal(record)}
    />
  );
};
