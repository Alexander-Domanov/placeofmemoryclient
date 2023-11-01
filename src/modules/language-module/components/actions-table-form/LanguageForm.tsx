import { Button, Form, Input } from 'antd';
import React from 'react';
import { ILanguage } from '@/types';
import { FORM_ITEMS, IAddLanguageForm } from '@/modules/language-module';

export const LanguageForm = ({
  onFinishSubmit,
  isSuccess,
  useForm,
}: IAddLanguageForm) => {
  const onFinish = (values: ILanguage) => {
    onFinishSubmit(values);
    if (isSuccess) useForm.resetFields();
  };
  return (
    <Form
      layout="vertical"
      form={useForm}
      onFinish={onFinish}
      style={{ width: 400 }}
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
      <Form.Item className="flex justify-end">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
