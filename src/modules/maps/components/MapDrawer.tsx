import React, { useState } from 'react';
import { Button, Divider, Drawer, Form, message, Space } from 'antd';
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
}

const MapDrawer: React.FC<MapDrawerProps> = ({ onPlaceSelected }) => {
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] =
    useState<IPlaceResultAfterExtract | null>(null);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [form] = Form.useForm();

  const onFillToForm = (place: IPlaceResultAfterExtract): void => {
    form.setFieldValue(['country'], place?.country);
    form.setFieldValue(['city'], place?.city);
    form.setFieldValue(
      ['administrativeAreaLevel1'],
      place?.administrativeAreaLevel1
    );
    form.setFieldValue(
      ['administrativeAreaLevel2'],
      place?.administrativeAreaLevel2
    );
    form.setFieldValue(['street'], place?.street);
    form.setFieldValue(['streetNumber'], place?.streetNumber);
    form.setFieldValue(['postalCode'], place?.postalCode);
    form.setFieldValue(['formattedAddress'], place?.formattedAddress);
    form.setFieldValue(
      ['location', 'name'],
      place?.formattedAddress.split(',')[0]
    );
    form.setFieldValue(['location', 'lat'], place?.location?.lat);
    form.setFieldValue(['location', 'lng'], place?.location?.lng);
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
    message.success(`Place: ${place?.formattedAddress} is selected`);
    onPlaceSelected(place);
  };

  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={showDrawer}
          icon={<FaLocationDot />}
          style={{ marginBottom: 12 }}
        >
          Find Location
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
