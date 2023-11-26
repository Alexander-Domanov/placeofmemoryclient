import React, { FC } from 'react';
import { List, Typography } from 'antd';
import { ILocation } from '@/types';
import { useTranslation } from '@/components/internationalization';

interface IInfoLocationFormProps {
  location: ILocation | null;
}

export const MetaInfoLocationForm: FC<IInfoLocationFormProps> = ({
  location: selectedLocation,
}) => {
  const { t } = useTranslation();
  return (
    <List split={false}>
      <List.Item>
        <Typography.Text>
          <span className="text-neutral-400">
            {t.dashboard.locationInfo.formattedAddress}: &nbsp;
          </span>
          {selectedLocation?.place}
        </Typography.Text>
      </List.Item>

      <List.Item>
        <Typography.Text>
          <span className="text-neutral-400">
            {t.dashboard.locationInfo.longitude}: &nbsp;
          </span>
          {selectedLocation?.lng}
        </Typography.Text>
      </List.Item>

      <List.Item>
        <Typography.Text>
          <span className="text-neutral-400">
            {t.dashboard.locationInfo.latitude}: &nbsp;
          </span>
          {selectedLocation?.lat}
        </Typography.Text>
      </List.Item>
    </List>
  );
};
