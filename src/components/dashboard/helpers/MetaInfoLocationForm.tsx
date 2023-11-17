import React, { FC } from 'react';
import { List, Typography } from 'antd';
import { ILocation } from '@/types';

interface IInfoLocationFormProps {
  location: ILocation | null;
}

export const MetaInfoLocationForm: FC<IInfoLocationFormProps> = ({
  location: selectedLocation,
}) => (
  <List split={false}>
    <List.Item>
      <Typography.Text>
        <span className="text-neutral-400">Formatted Address: &nbsp;</span>
        {selectedLocation?.place}
      </Typography.Text>
    </List.Item>

    <List.Item>
      <Typography.Text>
        <span className="text-neutral-400">Longitude: &nbsp;</span>
        {selectedLocation?.lng}
      </Typography.Text>
    </List.Item>

    <List.Item>
      <Typography.Text>
        <span className="text-neutral-400">Latitude: &nbsp;</span>
        {selectedLocation?.lat}
      </Typography.Text>
    </List.Item>
  </List>
);
