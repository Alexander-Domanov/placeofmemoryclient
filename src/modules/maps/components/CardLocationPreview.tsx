import React, { FC, useEffect, useState } from 'react';
import { Collapse, Typography } from 'antd';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';

const { Panel } = Collapse;

interface CardLocationPreviewProps {
  onPlaceSelected: IPlaceResultAfterExtract | null;
}

const panels = [
  {
    key: '1',
    header: 'Name location',
    content: (selectedPlace: IPlaceResultAfterExtract | null) => (
      <Typography.Text>{selectedPlace?.location.name || ''}</Typography.Text>
    ),
  },
  {
    key: '2',
    header: 'Longitude',
    content: (selectedPlace: IPlaceResultAfterExtract | null) => (
      <Typography.Text>{selectedPlace?.location.lng || ''}</Typography.Text>
    ),
  },
  {
    key: '3',
    header: 'Latitude',
    content: (selectedPlace: IPlaceResultAfterExtract | null) => (
      <Typography.Text>{selectedPlace?.location.lat || ''}</Typography.Text>
    ),
  },
];

export const CardLocationPreview: FC<CardLocationPreviewProps> = ({
  onPlaceSelected,
}) => {
  const [selectedPlace, setSelectedPlace] =
    useState<IPlaceResultAfterExtract | null>(null);

  useEffect(() => {
    setSelectedPlace(onPlaceSelected);
  }, [onPlaceSelected]);

  return (
    <div>
      <Collapse ghost>
        {panels.map((panel) => (
          <Panel
            header={panel.header}
            key={panel.key}
            className="card-location-preview-panel"
          >
            {panel.content(selectedPlace)}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
