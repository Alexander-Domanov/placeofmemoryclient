import React, { FC } from 'react';
import { DatePicker, Form, Input } from 'antd';
import { ICreatePerson } from '@/types';
import { validateMessages } from '@/common-dashboard/validations/ValidateMessages';

interface PersonFormProps {
  form: any;
  onFinish: (values: ICreatePerson) => void;
}

const PersonForm: FC<PersonFormProps> = ({ form, onFinish }) => {
  // const currentDate = new Date();
  //
  // const validateDate = (
  //   rule: any,
  //   value: any,
  //   callback: (error?: string) => void
  // ) => {
  //   if (value && value > currentDate) {
  //     callback('Date cannot be in the future');
  //   } else {
  //     callback();
  //   }
  // };
  //
  // const validateBirthDate = (
  //   rule: any,
  //   value: any,
  //   callback: (error?: string) => void
  // ) => {
  //   const deathDate = form.getFieldValue(['deathDate']);
  //   if (value && deathDate && value > deathDate) {
  //     callback('Birth Date cannot be greater than Death Date');
  //   } else {
  //     callback();
  //   }
  // };

  return (
    <Form
      layout="vertical"
      form={form}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      // initialValues={{
      //   birthDate: form.getFieldValue(['birthDate']),
      // }}
    >
      <Form.Item
        name={['name']}
        label="First Name"
        rules={[{ required: true, whitespace: true }]}
        hasFeedback
      >
        <Input placeholder="Input First Name" allowClear />
      </Form.Item>
      <Form.Item
        name={['lastName']}
        label="Last Name"
        rules={[{ required: true, whitespace: true }]}
        hasFeedback
      >
        <Input placeholder="Input Last Name" allowClear />
      </Form.Item>
      <Form.Item
        name={['patronymic']}
        label="Patronymic"
        rules={[{ required: true, whitespace: true }]}
        hasFeedback
      >
        <Input placeholder="Input Patronymic" allowClear />
      </Form.Item>
      <Form.Item label="Date of birth and death">
        <Form.Item
          name={['birthDate']}
          style={{ display: 'inline-block', width: 'calc(50% - 16px)' }}
          // initialValue={form.getFieldValue(['birthDate'])}
          rules={[{ required: true, message: 'Birth Date is required' }]}
        >
          <DatePicker placeholder="Select Birth Date" />
        </Form.Item>
        <span
          style={{
            display: 'inline-block',
            width: '24px',
            lineHeight: '32px',
            textAlign: 'center',
          }}
        >
          -
        </span>
        <Form.Item
          name={['deathDate']}
          style={{ display: 'inline-block', width: 'calc(50% - 16px)' }}
          rules={[{ required: true, message: 'Death Date is required' }]}
        >
          <DatePicker placeholder="Select Death Date" />
        </Form.Item>
      </Form.Item>
      <Form.Item
        name={['biography']}
        label="Biography"
        rules={[{ required: true }]}
      >
        <Input.TextArea showCount maxLength={1000} autoSize={{ minRows: 10 }} />
      </Form.Item>
      <Form.Item
        name={['slug']}
        label="Slug"
        rules={[{ required: true, whitespace: true }]}
      >
        <Input placeholder="This field is auto generated" allowClear />
      </Form.Item>
    </Form>
  );
};

export default PersonForm;
