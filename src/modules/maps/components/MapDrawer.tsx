import React, { useState } from 'react';
import { Button, Divider, Drawer, Form, Space } from 'antd';
import { FaLocationDot } from 'react-icons/fa6';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import MapWithAutoComplete from '@/modules/maps/components/MapWithAutoComplete';
import { extractPlaceData } from '@/modules/maps/components/helpers/placeUtils';
import LocationForm from '@/modules/maps/components/LocationForm';

const styleButton = {
  cursor: 'pointer',
  color: '#1890ff',
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
};

interface MapDrawerProps {
  onPlaceSelected: (place: IPlaceResultAfterExtract) => void;
  disabled?: boolean;
}

const MapDrawer: React.FC<MapDrawerProps> = ({ onPlaceSelected, disabled }) => {
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] =
    useState<IPlaceResultAfterExtract | null>(null);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [form] = Form.useForm();

  const onFillToForm = (place: IPlaceResultAfterExtract): void => {
    form.setFieldsValue({
      country: place?.country,
      city: place?.city,
      administrativeAreaLevel1: place?.administrativeAreaLevel1,
      administrativeAreaLevel2: place?.administrativeAreaLevel2,
      street: place?.street,
      streetNumber: place?.streetNumber,
      postalCode: place?.postalCode,
      formattedAddress: place?.formattedAddress,
      location: {
        place: place?.formattedAddress,
        lat: place?.location?.lat,
        lng: place?.location?.lng,
      },
    });
  };
  const handleExecuteGeoCoder = (
    location: google.maps.LatLngLiteral | null
  ) => {
    setMarkerPosition(location);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onExecuteGeoCoder = () => {
    if (markerPosition?.lat && markerPosition?.lng) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const place = results[0] as google.maps.GeocoderResult;
          const filteredPlace = extractPlaceData(place);
          onFillToForm(filteredPlace);
        }
      });
    }
  };
  const onClearForm = () => {
    form.resetFields();
    setSelectedPlace(null);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (place: IPlaceResultAfterExtract) => {
    setSelectedPlace(place);
    setOpen(false);
    onPlaceSelected(place);
  };

  return (
    <>
      <Space>
        <Button
          type="default"
          onClick={showDrawer}
          icon={<FaLocationDot />}
          disabled={disabled}
          // style={{ cursor: 'pointer', color: '#74c782' }}
        >
          Open Map
        </Button>
      </Space>

      <Drawer
        placement="right"
        width={520}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button
              onClick={onClearForm}
              style={{ cursor: 'pointer', color: '#f66321' }}
            >
              Clear Table
            </Button>
            <Button onClick={onExecuteGeoCoder} style={styleButton}>
              Fill Table
            </Button>
          </Space>
        }
      >
        <MapWithAutoComplete onDefineLocation={handleExecuteGeoCoder} />

        <Divider orientation="left">Define Location</Divider>

        <LocationForm form={form} onFinish={onFinish} />
      </Drawer>
    </>
  );
};

export default MapDrawer;
