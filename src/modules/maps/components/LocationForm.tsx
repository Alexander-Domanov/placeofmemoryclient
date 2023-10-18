import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface LocationFormProps {
  form: any;
  onFinish: (place: IPlaceResultAfterExtract) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ form, onFinish }) => {
  return (
    <Space direction="vertical">
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name={['country']}
          label="Country"
          rules={[{ required: true, whitespace: true }]}
        >
          <Input placeholder="Input Country" allowClear />
        </Form.Item>
        <Form.Item name={['city']} label="City" rules={[{ required: true }]}>
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
  );
};

export default LocationForm;
