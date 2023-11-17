import React, { FC } from 'react';
import { List, Typography } from 'antd';

interface IInfoSelectedPlaceFormProps {
  place: {
    value: string;
    id: number;
    formattedAddress: string;
  } | null;
}

export const MetaInfoSelectedPlaceForm: FC<IInfoSelectedPlaceFormProps> = ({
  place: selectedPlace,
}) => (
  <List split={false}>
    <List.Item>
      <Typography.Text>
        <span className="text-neutral-400">Selected place: &nbsp;</span>
        {selectedPlace?.value}
      </Typography.Text>
    </List.Item>

    <List.Item>
      <Typography.Text>
        <span className="text-neutral-400">Formatted address: &nbsp;</span>
        {selectedPlace?.formattedAddress}
      </Typography.Text>
    </List.Item>
  </List>
);
