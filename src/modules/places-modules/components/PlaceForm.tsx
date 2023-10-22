import React from 'react';
import { Button, Form, Input } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
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

  form.setFieldValue(['country'], onPlaceSelectedFromMap?.country);
  form.setFieldValue(['city'], onPlaceSelectedFromMap?.city);
  form.setFieldValue(
    ['nameCemetery'],
    onPlaceSelectedFromMap?.formattedAddress
  );
  form.setFieldValue(
    ['location', 'name'],
    onPlaceSelectedFromMap?.location.name
  );
  form.setFieldValue(
    ['location', 'longitude'],
    onPlaceSelectedFromMap?.location.lng
  );
  form.setFieldValue(
    ['location', 'latitude'],
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
        name={['country']}
        label="Country"
        rules={[{ required: true, whitespace: true }]}
      >
        <Input placeholder="Input Country" allowClear disabled />
      </Form.Item>
      <Form.Item name={['city']} label="City" rules={[{ required: true }]}>
        <Input placeholder="Input City" allowClear disabled />
      </Form.Item>
      <Form.Item
        name={['nameCemetery']}
        label="Name Cemetery"
        rules={[{ required: true }]}
      >
        <Input placeholder="Input Name Cemetery" allowClear disabled />
      </Form.Item>
      <Form.Item
        name={['shortDescription']}
        label="Short Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
      <Form.Item
        name={['description']}
        label="Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea showCount maxLength={300} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PlaceForm;
