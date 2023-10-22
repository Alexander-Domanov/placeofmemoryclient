import React from 'react';
import { Button, Form, Input } from 'antd';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import { ICreatePlace } from '@/types';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 'auto' },
};

const validateMessages = {
  required: `$\{label} is required!`,
  types: {
    email: `$\{label} is not a valid email!`,
    number: `$\{label} is not a valid number!`,
  },
  number: {
    range: `$\{label} must be between $\{min} and $\{max}`,
  },
};

interface MapDrawerProps {
  onPlaceSelectedFromMap: IPlaceResultAfterExtract | null;
  onFinish: (values: ICreatePlace) => void;
}

const PlaceForm: React.FC<MapDrawerProps> = ({
  onPlaceSelectedFromMap,
  onFinish,
}) => {
  const [form] = Form.useForm();

  form.setFieldValue(['place', 'country'], onPlaceSelectedFromMap?.country);
  form.setFieldValue(['place', 'city'], onPlaceSelectedFromMap?.city);
  form.setFieldValue(
    ['place', 'nameCemetery'],
    onPlaceSelectedFromMap?.formattedAddress
  );
  form.setFieldValue(
    ['place', 'location', 'name'],
    onPlaceSelectedFromMap?.location.name
  );
  form.setFieldValue(
    ['place', 'location', 'longitude'],
    onPlaceSelectedFromMap?.location.lng
  );
  form.setFieldValue(
    ['place', 'location', 'latitude'],
    onPlaceSelectedFromMap?.location.lat
  );

  return (
    <Form
      layout="vertical"
      form={form}
      name="nest-messages"
      onFinish={(values) => {
        onFinish({
          ...values,
          location: {
            name: onPlaceSelectedFromMap?.location.name || null,
            longitude: onPlaceSelectedFromMap?.location.lng || null,
            latitude: onPlaceSelectedFromMap?.location.lat || null,
          },
        });
      }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={['place', 'country']}
        label="Country"
        rules={[{ required: true, whitespace: true }]}
      >
        <Input placeholder="Input Country" allowClear />
      </Form.Item>
      <Form.Item
        name={['place', 'city']}
        label="City"
        rules={[{ required: true }]}
      >
        <Input placeholder="Input City" allowClear />
      </Form.Item>
      <Form.Item
        name={['place', 'nameCemetery']}
        label="Name Cemetery"
        rules={[{ required: true }]}
      >
        <Input placeholder="Input Name Cemetery" allowClear />
      </Form.Item>
      <Form.Item name={['place', 'shortDescription']} label="Short Description">
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
      <Form.Item name={['place', 'description']} label="Description">
        <Input.TextArea showCount maxLength={300} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PlaceForm;
