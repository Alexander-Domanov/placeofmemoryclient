import { Avatar, Badge, Image, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const RenderImage = (
  url: string | null | undefined,
  size: number,
  isPreview = false
) => {
  return url ? (
    <Row justify="center">
      <Badge size="default">
        <Image
          src={url}
          width={size}
          preview={isPreview}
          style={{ borderRadius: 4 }}
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
