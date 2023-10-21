import React from 'react';
import { Button, Form, Input, message, Space, Typography } from 'antd';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
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
  onPlaceSelected: IPlaceResultAfterExtract | null;
}

const PlaceForm: React.FC<MapDrawerProps> = ({ onPlaceSelected }) => {
  const [form] = Form.useForm();

  form.setFieldValue(['place', 'country'], onPlaceSelected?.country);
  form.setFieldValue(['place', 'city'], onPlaceSelected?.city);
  form.setFieldValue(
    ['place', 'nameCemetery'],
    onPlaceSelected?.formattedAddress
  );
  form.setFieldValue(
    ['place', 'location', 'name'],
    onPlaceSelected?.location.name
  );
  form.setFieldValue(
    ['place', 'location', 'longitude'],
    onPlaceSelected?.location.lng
  );
  form.setFieldValue(
    ['place', 'location', 'latitude'],
    onPlaceSelected?.location.lat
  );

  const onFinish = (values: any) => {
    message.info(`fin ======== ${JSON.stringify(values)}`);
  };

  return (
    <Space direction="vertical">
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        // style={{ maxWidth: 1000 }}
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
        <Form.Item
          name={['place', 'location', 'name']}
          label="Location Name"
          rules={[{ required: true }]}
        >
          <Typography.Text>
            {onPlaceSelected?.location.name || ''}
          </Typography.Text>
        </Form.Item>
        <Form.Item
          name={['place', 'location', 'longitude']}
          label="Longtitude"
          rules={[{ required: true }]}
        >
          <Typography.Text>
            {onPlaceSelected?.location.lng || ''}
          </Typography.Text>
        </Form.Item>
        <Form.Item
          name={['place', 'location', 'latitude']}
          label="Latitude"
          rules={[{ required: true }]}
        >
          <Typography.Text>
            {onPlaceSelected?.location.lat || ''}
          </Typography.Text>
        </Form.Item>
        <Form.Item
          name={['place', 'shortDescription']}
          label="Short Description"
        >
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
    </Space>
  );
};

export default PlaceForm;
