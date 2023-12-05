import React, { FC, useEffect, useState } from 'react';
import { List, Typography } from 'antd';
import Link from 'next/link';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import { IOwnerInfo, Statuses, StatusUser } from '@/types';
import { GetEllipsisSlug } from '@/components';
import { useTranslation } from '@/components/internationalization';
import { useMeQuery } from '@/services';

interface IInfoFormProps {
  slug: string | undefined;
  status: string | undefined;
  path: string | undefined;
  owner: IOwnerInfo | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}

export const MetaInfoForm: FC<IInfoFormProps> = ({
  slug,
  status,
  path,
  owner,
  createdAt,
  updatedAt,
}) => {
  const { t } = useTranslation();
  const { data: me } = useMeQuery();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (status !== Statuses.PUBLISHED || me?.status === StatusUser.BANNED) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [status, me?.status]);

  return (
    <List split={false}>
      <List.Item>
        <Typography.Text>
          <span className="text-neutral-400">
            {t.dashboard.metaInfo.publicLink.label}: &nbsp;
          </span>
          {isDisabled ? (
            t.dashboard.metaInfo.publicLink.no
          ) : (
            <Link href={{ pathname: path }}>
              <GetEllipsisSlug slug={slug} />
            </Link>
          )}
        </Typography.Text>
      </List.Item>

      <List.Item>
        <Typography.Text>
          <span className="text-neutral-400">
            {t.dashboard.metaInfo.owner}: &nbsp;
          </span>
          {owner?.userName}
        </Typography.Text>
      </List.Item>

      <List.Item>
        <Typography.Text>
          <span className="font-normal text-neutral-400">
            {t.dashboard.metaInfo.createdAt}: &nbsp;
          </span>
          {convertDateToFormat(createdAt)}
        </Typography.Text>
      </List.Item>

      <List.Item>
        <Typography.Text>
          <span className="font-normal text-neutral-400">
            {t.dashboard.metaInfo.updatedAt}: &nbsp;
          </span>
          {convertDateToFormat(updatedAt)}
        </Typography.Text>
      </List.Item>
    </List>
  );
};
