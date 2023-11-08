import Link from 'next/link';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import { HomeOutlined } from '@ant-design/icons';

export const CreateBreadcrumb = ({
  key,
  text,
  icon = false,
  withLink = true,
}: {
  key: string;
  text?: string | null;
  icon?: boolean;
  withLink?: boolean;
}): Partial<BreadcrumbItemType & BreadcrumbSeparatorType> => {
  if (icon) {
    const iconElement = <HomeOutlined />;
    return {
      key,
      title: withLink ? (
        <Link href={key}>
          {iconElement} {text}
        </Link>
      ) : (
        <>
          {iconElement} {text}
        </>
      ),
    };
  }
  return {
    key,
    title: withLink ? <Link href={key}>{text}</Link> : text,
  };
};
