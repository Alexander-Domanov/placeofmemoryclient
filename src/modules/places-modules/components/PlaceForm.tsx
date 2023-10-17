import React from 'react';
import { Button, Divider, Form, Input, message, Space } from 'antd';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import AutoCompleteMapComponent from '@/modules/maps/components/AutoCompleteMap';

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
const PlaceForm = () => {
  const [form] = Form.useForm();

  const onPlaceSelected = (place: IPlaceResultAfterExtract) => {
    form.setFieldValue(['place', 'country'], place?.country);
    form.setFieldValue(['place', 'city'], place?.city);
    form.setFieldValue(['place', 'nameCemetery'], place?.formattedAddress);
  };

  const onFinish = (values: any) => {
    message.info(`fin ======== ${JSON.stringify(values)}`);
  };

  return (
    <Space direction="vertical">
      <AutoCompleteMapComponent onPlaceSelected={onPlaceSelected} />
      <Divider />
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
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
