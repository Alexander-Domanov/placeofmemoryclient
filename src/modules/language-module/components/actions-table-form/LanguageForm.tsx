import { Button, Form, Input } from 'antd';
import React from 'react';
import { SaveOutlined } from '@ant-design/icons';
import { ILanguage } from '@/types';
import { FORM_ITEMS, IAddLanguageForm } from '@/modules/language-module';
import { useTranslation } from '@/components/internationalization';

export const LanguageForm = ({
  onFinishSubmit,
  isSuccess,
  useForm,
}: IAddLanguageForm) => {
  const { t } = useTranslation();
  const formItems = FORM_ITEMS(t);
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
      {formItems.map((item) => (
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
        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
          {t.dashboard.languages.form.save}
        </Button>
      </Form.Item>
    </Form>
  );
};
