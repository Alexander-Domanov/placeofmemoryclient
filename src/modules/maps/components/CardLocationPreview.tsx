import { FC } from 'react';
import { Collapse, Typography } from 'antd';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';

const { Panel } = Collapse;

interface CardLocationPreviewProps {
  onPlaceSelected: IPlaceResultAfterExtract | null;
}
export const CardLocationPreview: FC<CardLocationPreviewProps> = ({
  onPlaceSelected,
}) => {
  return (
    <div>
      <Collapse accordion>
        <Panel header="Name location" key="1">
          <Typography.Text>
            {onPlaceSelected?.location.name || ''}
          </Typography.Text>
        </Panel>
        <Panel header="Longitude" key="2">
          <Typography.Text>
            {onPlaceSelected?.location.lng || ''}
          </Typography.Text>
        </Panel>
        <Panel header="Latitude" key="3">
          <Typography.Text>
            {onPlaceSelected?.location.lat || ''}
          </Typography.Text>
        </Panel>
      </Collapse>
    </div>
  );
};
