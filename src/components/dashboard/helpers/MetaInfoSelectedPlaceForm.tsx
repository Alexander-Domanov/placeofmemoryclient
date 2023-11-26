import React, { FC } from 'react';
import { List, Typography } from 'antd';
import { useTranslation } from '@/components/internationalization';

interface IInfoSelectedPlaceFormProps {
  place: {
    namePlace: string;
    id: number;
    formattedAddress: string;
  } | null;
}

export const MetaInfoSelectedPlaceForm: FC<IInfoSelectedPlaceFormProps> = ({
  place: selectedPlace,
}) => {
  const { t } = useTranslation();
  return (
    <List split={false}>
      <List.Item>
        <Typography.Text>
          <span className="text-neutral-400">
            {t.dashboard.persons.place.selectedPlace}: &nbsp;
          </span>
          {selectedPlace?.namePlace}
        </Typography.Text>
      </List.Item>

      <List.Item>
        <Typography.Text>
          <span className="text-neutral-400">
            {t.dashboard.persons.place.address}: &nbsp;
          </span>
          {selectedPlace?.formattedAddress}
        </Typography.Text>
      </List.Item>
    </List>
  );
};
