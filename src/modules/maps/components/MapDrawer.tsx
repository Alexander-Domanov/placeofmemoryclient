import React, { useState } from 'react';
import { Button, Drawer, message, Space } from 'antd';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import MapWithAutoComplete from '@/modules/maps/components/MapWithAutoComplete';

const MapDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] =
    useState<IPlaceResultAfterExtract | null>(null);

  const handlePlaceSelected = (place: IPlaceResultAfterExtract) => {
    message.success(
      `Selected place  ????lfsadbf;basdkhf???===: ${JSON.stringify(place)}`
    );
    setSelectedPlace(place);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Open Map
        </Button>
      </Space>
      <Drawer
        title="Search the Location…"
        placement="right"
        width={540}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            {/* <Button onClick={onExecuteGeoCoder}>Define Location</Button> */}
            {/* <Button onClick={onClose}>Cancel</Button> */}
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <MapWithAutoComplete onPlaceSelected={handlePlaceSelected} />
      </Drawer>
    </>
  );
};

export default MapDrawer;
