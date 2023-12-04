import React, { FC, useState } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import { useTranslation } from '@/components/internationalization';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

interface LocationFormProps {
  form: any;
  onFinish: (place: IPlaceResultAfterExtract) => void;
}

const LocationForm: FC<LocationFormProps> = ({ form, onFinish }) => {
  const { t } = useTranslation();
  const [isButtonActive, setIsButtonActive] = useState(false);

  const checkLng = (_: any, value: number) => {
    // eslint-disable-next-line
    if (isNaN(value)) {
      return Promise.reject(
        new Error(t.dashboard.locationInfo.form.longitude.rules.type)
      );
    }
    if (value > 180 || value < -180) {
      return Promise.reject(
        new Error(t.dashboard.locationInfo.form.longitude.rules.range)
      );
    }
    if (value.toString().length > 10) {
      return Promise.reject(
        new Error(t.dashboard.locationInfo.form.longitude.rules.maxLength)
      );
    }
    return Promise.resolve();
  };
  const checkLat = (_: any, value: number) => {
    // eslint-disable-next-line
    if (isNaN(value)) {
      return Promise.reject(
        new Error(t.dashboard.locationInfo.form.latitude.rules.type)
      );
    }
    if (value > 90 || value < -90) {
      return Promise.reject(
        new Error(t.dashboard.locationInfo.form.latitude.rules.range)
      );
    }
    if (value.toString().length > 10) {
      return Promise.reject(
        new Error(t.dashboard.locationInfo.form.latitude.rules.maxLength)
      );
    }
    return Promise.resolve();
  };

  return (
    <Flex gap="small" vertical>
      <Form
        {...layout}
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        // validateMessages={validateMessages}
      >
        <Form.Item
          name={['country']}
          label={t.dashboard.locationInfo.form.country.label}
          rules={[
            {
              max: 120,
              message: t.dashboard.locationInfo.form.country.rules.max,
            },
            {
              required: true,
              whitespace: true,
              message: t.dashboard.locationInfo.form.country.rules.required,
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder={t.dashboard.locationInfo.form.country.placeholder}
            allowClear
            status="warning"
          />
        </Form.Item>

        <Form.Item
          name={['city']}
          label={t.dashboard.locationInfo.form.city.label}
          rules={[
            {
              max: 120,
              message: t.dashboard.locationInfo.form.city.rules.max,
            },
            {
              required: true,
              message: t.dashboard.locationInfo.form.city.rules.required,
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder={t.dashboard.locationInfo.form.city.placeholder}
            allowClear
            status="warning"
          />
        </Form.Item>

        <Form.Item
          name={['formattedAddress']}
          label={t.dashboard.locationInfo.form.address.label}
          rules={[
            {
              max: 180,
              message: t.dashboard.locationInfo.form.address.rules.max,
            },
            {
              required: true,
              message: t.dashboard.locationInfo.form.address.rules.required,
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder={t.dashboard.locationInfo.form.address.placeholder}
            allowClear
            status="warning"
          />
        </Form.Item>

        <Form.Item
          name={['location', 'lng']}
          validateDebounce={300}
          validateFirst
          label={t.dashboard.locationInfo.form.longitude.label}
          rules={[
            { validator: checkLng },
            {
              required: true,
              message: t.dashboard.locationInfo.form.longitude.rules.required,
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder={t.dashboard.locationInfo.form.longitude.placeholder}
            allowClear
            status="warning"
          />
        </Form.Item>

        <Form.Item
          name={['location', 'lat']}
          validateFirst
          label={t.dashboard.locationInfo.form.latitude.label}
          rules={[
            { validator: checkLat },
            {
              required: true,
              message: t.dashboard.locationInfo.form.latitude.rules.required,
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder={t.dashboard.locationInfo.form.latitude.placeholder}
            allowClear
            status="warning"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            {t.dashboard.locationInfo.form.buttons.fillForm}
          </Button>
        </Form.Item>

        <Button
          type={isButtonActive ? 'text' : 'text'}
          title={t.dashboard.locationInfo.form.buttons.details.title}
          icon={isButtonActive ? <CaretUpOutlined /> : <CaretDownOutlined />}
          onClick={() => {
            setIsButtonActive(!isButtonActive);
          }}
          className={isButtonActive ? 'active-button' : ''}
        >
          {t.dashboard.locationInfo.form.buttons.details.open}
        </Button>

        {isButtonActive && (
          <>
            <Form.Item
              name={['administrativeAreaLevel1']}
              label={
                t.dashboard.locationInfo.form.administrativeAreaLevel1.label
              }
              rules={[
                {
                  max: 120,
                  message: t.dashboard.locationInfo.form.city.rules.max,
                },
              ]}
            >
              <Input
                placeholder={
                  t.dashboard.locationInfo.form.administrativeAreaLevel1
                    .placeholder
                }
                allowClear
              />
            </Form.Item>

            <Form.Item
              name={['administrativeAreaLevel2']}
              label={
                t.dashboard.locationInfo.form.administrativeAreaLevel2.label
              }
              rules={[
                {
                  max: 120,
                  message: t.dashboard.locationInfo.form.city.rules.max,
                },
              ]}
            >
              <Input
                placeholder={
                  t.dashboard.locationInfo.form.administrativeAreaLevel2
                    .placeholder
                }
                allowClear
              />
            </Form.Item>

            <Form.Item
              name={['street']}
              label={t.dashboard.locationInfo.form.street.label}
              rules={[
                {
                  max: 120,
                  message: t.dashboard.locationInfo.form.city.rules.max,
                },
              ]}
            >
              <Input
                placeholder={t.dashboard.locationInfo.form.street.placeholder}
                allowClear
              />
            </Form.Item>

            <Form.Item
              name={['streetNumber']}
              label={t.dashboard.locationInfo.form.streetNumber.label}
              rules={[
                {
                  max: 120,
                  message: t.dashboard.locationInfo.form.city.rules.max,
                },
              ]}
            >
              <Input
                placeholder={
                  t.dashboard.locationInfo.form.streetNumber.placeholder
                }
                allowClear
              />
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
