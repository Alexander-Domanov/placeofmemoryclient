import { Typography } from 'antd';
import { FC } from 'react';

interface GetEllipsisSlugProps {
  slug: string | undefined;
  maxLength?: number;
}

export const GetEllipsisSlug: FC<GetEllipsisSlugProps> = ({
  slug,
  maxLength = 30,
}) => {
  if (slug && slug?.length > maxLength) {
    const ellipsisSlug = `${slug?.slice(0, maxLength)}...`;
    return (
      <Typography.Text
        ellipsis
        style={{ cursor: 'pointer', color: '#1087f6' }}
        title={slug}
      >
        {ellipsisSlug}
      </Typography.Text>
    );
  }
  return slug || '';
};
