import React, { FC } from 'react';
import { Collapse, Typography } from 'antd';
import { ILocation } from '@/types';

const { Panel } = Collapse;

const panels = [
  {
    key: '1',
    header: 'Longitude',
    content: (selectedLocation: ILocation | null) => (
      <Typography.Text>{selectedLocation?.lng || ''}</Typography.Text>
    ),
  },
  {
    key: '2',
    header: 'Latitude',
    content: (selectedLocation: ILocation | null) => (
      <Typography.Text>{selectedLocation?.lat || ''}</Typography.Text>
    ),
  },
];

interface LocationPreviewProps {
  selectedLocation: ILocation | null;
}

const LocationPreview: FC<LocationPreviewProps> = ({ selectedLocation }) => {
  return (
    <Collapse ghost>
      {panels.map((panel) => (
        <Panel
          header={panel.header}
          key={panel.key}
          className="card-location-preview-panel"
        >
          {panel.content(selectedLocation)}
        </Panel>
      ))}
    </Collapse>
  );
};

export default LocationPreview;
