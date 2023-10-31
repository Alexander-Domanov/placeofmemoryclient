import { Button, Form, Input } from 'antd';
import React from 'react';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import { ILanguage } from '@/types';
import { FORM_ITEMS } from '@/modules/language-module';

interface IFieldType extends ILanguage {}
interface IAddLanguageForm {
  onFinishSubmit: (values: IFieldType) => void;
  isSuccess: boolean;
  useForm: FormInstance;
}

export const AddLanguageForm = ({
  onFinishSubmit,
  isSuccess,
  useForm,
}: IAddLanguageForm) => {
  const onFinish = (values: IFieldType) => {
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
