import React, { FC, useState } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import { validateMessages } from '@/common-dashboard';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

interface LocationFormProps {
  form: any;
  onFinish: (place: IPlaceResultAfterExtract) => void;
}

const LocationForm: FC<LocationFormProps> = ({ form, onFinish }) => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  return (
    <Flex gap="small" vertical>
      <Form
        {...layout}
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['country']}
          label="Country"
          rules={[{ required: true, whitespace: true }]}
          hasFeedback
        >
          <Input placeholder="Input Country" allowClear status="warning" />
        </Form.Item>

        <Form.Item
          name={['city']}
          label="City"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input placeholder="Input City" allowClear status="warning" />
        </Form.Item>

        <Form.Item
          name={['formattedAddress']}
          label="Address"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input placeholder="Input Name" allowClear status="warning" />
        </Form.Item>

        <Form.Item
          name={['location', 'lng']}
          label="Longtitude"
          rules={[{ type: 'number', min: -180, max: 180, required: true }]}
          hasFeedback
        >
          <Input placeholder="Input Longtitude" allowClear status="warning" />
        </Form.Item>

        <Form.Item
          name={['location', 'lat']}
          label="Latitude"
          rules={[{ type: 'number', min: -90, max: 90, required: true }]}
          hasFeedback
        >
          <Input placeholder="Input Longtitude" allowClear status="warning" />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Fill Form
          </Button>
        </Form.Item>

        <Button
          type={isButtonActive ? 'text' : 'text'}
          title="Show more details"
          icon={isButtonActive ? <CaretUpOutlined /> : <CaretDownOutlined />}
          onClick={() => {
            setIsButtonActive(!isButtonActive);
          }}
          className={isButtonActive ? 'active-button' : ''}
        >
          Details
        </Button>

        {isButtonActive && (
          <>
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
          </>
        )}
        {/* <Form.Item */}
        {/*  name={['location', 'place']} */}
        {/*  rules={[{ required: true }]} */}
        {/*  label="Place" */}
        {/*  hasFeedback */}
        {/* > */}
        {/*   <Input placeholder="Input Longtitude" allowClear status="warning" /> */}
        {/* </Form.Item> */}
      </Form>
    </Flex>
  );
};

export default LocationForm;
