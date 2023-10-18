import React, { useState } from 'react';
import { Button, Divider, Drawer, Form, Input, message, Space } from 'antd';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import MapWithAutoComplete from '@/modules/maps/components/MapWithAutoComplete';
import { extractPlaceData } from '@/modules/maps/components/helpers/placeUtils';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const styleButton = {
  cursor: 'pointer',
  color: '#1890ff',
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
};

const MapDrawer: React.FC = () => {
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
  const handleExecuteGeoCoder = (location: google.maps.LatLngLiteral) => {
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
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Open Map
        </Button>
      </Space>
      <Drawer
        // title="Search the Location…"
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
        <MapWithAutoComplete onExecuteGeoCoder={handleExecuteGeoCoder} />
        <Divider orientation="left">Define Location</Divider>
        <Space direction="vertical">
          <Form
            {...layout}
            form={form}
            // size="small"
            name="nest-messages"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            // validateMessages={validateMessages}
          >
            <Form.Item
              name={['country']}
              label="Country"
              rules={[{ required: true, whitespace: true }]}
            >
              <Input placeholder="Input Country" allowClear />
            </Form.Item>
            <Form.Item
              name={['city']}
              label="City"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input City" allowClear />
            </Form.Item>
            <Form.Item name={['administrativeAreaLevel1']} label="State">
              <Input placeholder="Input State" allowClear />
            </Form.Item>
            <Form.Item name={['administrativeAreaLevel2']} label="District">
              <Input placeholder="Input District" allowClear />
            </Form.Item>
            <Form.Item name={['street']} label="Street">
              <Input placeholder="Input Street" allowClear />
            </Form.Item>
            <Form.Item name={['streetNumber']} label="Street Number">
              <Input placeholder="Input Street Number" allowClear />
            </Form.Item>
            <Form.Item
              name={['formattedAddress']}
              label="Formatted Address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input Street Number" allowClear />
            </Form.Item>
            <Form.Item
              name={['location', 'name']}
              label="Location Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input Longtitude" allowClear />
            </Form.Item>
            <Form.Item
              name={['location', 'lng']}
              label="Longtitude"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input Longtitude" allowClear />
            </Form.Item>
            <Form.Item
              name={['location', 'lat']}
              label="Latitude"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input Longtitude" allowClear />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Drawer>
    </>
  );
};

export default MapDrawer;
