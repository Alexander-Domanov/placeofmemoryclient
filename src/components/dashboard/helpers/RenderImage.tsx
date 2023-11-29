import { Avatar, Badge, Image, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';

export const RenderImage = (
  url: string | null | undefined,
  size: number,
  isPreview = false
) => {
  return url ? (
    <Row justify="center">
      <Badge size="default">
        <Image
          key={url}
          src={url}
          width={size}
          preview={isPreview}
          style={{ borderRadius: 4 }}
          fallback={pictureBackup}
        />
      </Badge>
    </Row>
  ) : (
    <Row justify="center">
      <Badge size="default">
        <Avatar
          shape="square"
          size={size}
          icon={<UserOutlined />}
          style={{ borderRadius: 4 }}
        />
      </Badge>
    </Row>
  );
};
