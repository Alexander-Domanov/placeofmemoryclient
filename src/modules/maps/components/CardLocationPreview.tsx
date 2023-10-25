import React, { FC, useEffect, useState } from 'react';
import { Collapse, Typography } from 'antd';
import { ILocation } from '@/types';

const { Panel } = Collapse;

const panels = [
  // {
  //   key: '1',
  //   header: 'Name location',
  //   content: (selectedLocation: ILocation | null) => (
  //     <Typography.Text>{selectedLocation?.place || ''}</Typography.Text>
  //   ),
  // },
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

interface CardLocationPreviewProps {
  onLocationSelected: ILocation | null;
}

export const CardLocationPreview: FC<CardLocationPreviewProps> = ({
  onLocationSelected,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );

  useEffect(() => {
    setSelectedLocation(onLocationSelected);
  }, [selectedLocation]);

  return (
    <div>
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
    </div>
  );
};
