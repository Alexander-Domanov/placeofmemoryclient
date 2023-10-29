import { Button, Form, Input } from 'antd';
import React from 'react';
import { ILanguage } from '@/types';
import { FORM_ITEMS } from '@/modules/language-module';

interface IFieldType extends ILanguage {}
interface IAddLanguageForm {
  onFinishSubmit: (values: IFieldType) => void;
  isSuccess: boolean;
}

export const AddLanguageForm = ({
  onFinishSubmit,
  isSuccess,
}: IAddLanguageForm) => {
  const [form] = Form.useForm();
  const onFinish = (values: IFieldType) => {
    onFinishSubmit(values);
    if (isSuccess) form.resetFields();
  };
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 300 }}
    >
      {FORM_ITEMS.map((item) => (
        <Form.Item
          key={item.name}
          label={item.label}
          name={item.name}
          rules={item.rules}
        >
          <Input placeholder={item.placeholder} />
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
