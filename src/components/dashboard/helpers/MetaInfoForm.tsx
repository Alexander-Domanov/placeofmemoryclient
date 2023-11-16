import React, { FC } from 'react';
import { List, Typography } from 'antd';
import Link from 'next/link';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import { IOwnerInfo } from '@/types';
import { GetEllipsisSlug } from '@/components';
import { routes } from '@/common/routing/routes';

interface ArticleInfoFormProps {
  slug: string | undefined;
  owner: IOwnerInfo | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}

export const MetaInfoForm: FC<ArticleInfoFormProps> = ({
  slug,
  owner,
  createdAt,
  updatedAt,
}) => (
  <List split={false}>
    <List.Item draggable>
      <Typography.Text>
        <span className="text-neutral-400">Public link: &nbsp;</span>
        <Link
          href={{
            pathname: routes.articles.getArticle(slug || ''),
          }}
        >
          <GetEllipsisSlug slug={slug} />
        </Link>
      </Typography.Text>
    </List.Item>

    <List.Item draggable>
      <Typography.Text>
        <span className="text-neutral-400">Owner: &nbsp;</span>
        {owner?.userName}
      </Typography.Text>
    </List.Item>

    <List.Item>
      <Typography.Text>
        <span className="font-normal text-neutral-400">Created At: &nbsp;</span>
        {convertDateToFormat(createdAt)}
      </Typography.Text>
    </List.Item>

    <List.Item>
      <Typography.Text>
        <span className="font-normal text-neutral-400">Updated At: &nbsp;</span>
        {convertDateToFormat(updatedAt)}
      </Typography.Text>
    </List.Item>
  </List>
);
