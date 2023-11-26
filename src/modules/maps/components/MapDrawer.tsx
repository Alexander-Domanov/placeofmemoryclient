import { FC, useState } from 'react';
import { Button, Col, Divider, Drawer, Form, Space } from 'antd';
import { FaLocationDot } from 'react-icons/fa6';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import MapWithAutoComplete from '@/modules/maps/components/MapWithAutoComplete';
import { extractPlaceData } from '@/modules/maps/components/helpers/placeUtils';
import LocationForm from '@/modules/maps/components/LocationForm';
import { useTranslation } from '@/components/internationalization';

const styleButton = {
  cursor: 'pointer',
  // color: '#1890ff',
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
};

interface MapDrawerProps {
  onPlaceSelected: (place: IPlaceResultAfterExtract) => void;
  disabled?: boolean;
}

const MapDrawer: FC<MapDrawerProps> = ({ onPlaceSelected, disabled }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
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
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (place: IPlaceResultAfterExtract) => {
    setOpen(false);
    onPlaceSelected({
      ...place,
      location: {
        place: place?.formattedAddress,
        lat: place?.location?.lat,
        lng: place?.location?.lng,
      },
    });
  };

  return (
    <>
      <Space>
        <Button
          type="default"
          onClick={showDrawer}
          icon={<FaLocationDot />}
          disabled={disabled}
        >
          {t.dashboard.locationInfo.buttons.openMap}
        </Button>
      </Space>

      <Drawer
        placement="right"
        width={520}
        drawerStyle={{ backgroundColor: '#f0f2f5' }}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button
              onClick={onClearForm}
              style={{ cursor: 'pointer', color: '#f66321' }}
            >
              {t.dashboard.locationInfo.buttons.clearTable}
            </Button>

            <Button
              type="primary"
              onClick={onExecuteGeoCoder}
              style={styleButton}
            >
              {t.dashboard.locationInfo.buttons.fillTable}
            </Button>
          </Space>
        }
      >
        <Col span={24}>
          <MapWithAutoComplete onDefineLocation={handleExecuteGeoCoder} />

          <Divider orientation="left">
            {' '}
            {t.dashboard.locationInfo.buttons.define}
          </Divider>

          <LocationForm form={form} onFinish={onFinish} />
        </Col>
      </Drawer>
    </>
  );
};

export default MapDrawer;
