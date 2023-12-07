import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  List,
  notification,
  Row,
  Spin,
  Typography,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { routes } from '@/common/routing/routes';
import 'react-quill/dist/quill.snow.css';
import { useContacts } from '@/modules/contacts-module/hooks/useContacts';
import { useUpdateContacts } from '@/modules/contacts-module/hooks/useUpdateContacts';
import { IContacts, IContactsForm } from '@/types';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import {
  DashboardSelectLanguage,
  GetCharacterCount,
  QuillCharacterCount,
} from '@/components';
import { characterCountUtils } from '@/common-dashboard/utils/characterCountUtils';
import { AboutFormRules } from '@/modules/about-module/constants/AboutFormRules';
import { ValidationOfRedactorValue } from '@/common-dashboard';
import { useTranslation } from '@/components/internationalization';

const { isCharacterCountExceeded, getQuillStyle } = characterCountUtils;

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export const Contacts: FC = () => {
  const { t } = useTranslation();
  const { contacts, isFetching } = useContacts();
  const { updateContactsMutate, isUpdating } = useUpdateContacts();

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const [form] = Form.useForm();
  const [fields, setFields] = useState<FieldData[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<IContacts>();
  const [aboutText, setAboutText] = useState<string>('');

  const characterCount = GetCharacterCount(aboutText);

  useEffect(() => {
    if (contacts) {
      form.setFieldsValue({
        address: contacts.address,
        phone: contacts.phone,
        email: contacts.email,
        socialNetworks: {
          facebook: contacts.socialNetworks.facebook,
          telegram: contacts.socialNetworks.telegram,
          instagram: contacts.socialNetworks.instagram,
          partners: contacts.socialNetworks.partners,
        },
        about: contacts.about,
      });
      setSelectedContacts(contacts);
      setAboutText(contacts.about || '');
    }
  }, [contacts]);

  const onFinish = (values: IContactsForm) => {
    const form: IContactsForm = {
      address: values.address,
      phone: values.phone,
      email: values.email,
      socialNetworks: {
        facebook: values.socialNetworks.facebook,
        telegram: values.socialNetworks.telegram,
        instagram: values.socialNetworks.instagram,
        partners: values.socialNetworks.partners,
      },
      about: values.about,
    };

    updateContactsMutate(
      { data: form },
      {
        onSuccess: () => {
          notification.success({
            message: t.dashboard.contacts.notification.update.title,
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const aboutFormRules = AboutFormRules(t);

  const exceeded = isCharacterCountExceeded(
    characterCount,
    aboutFormRules.about.maxCharacters
  );
  const quillStyle = getQuillStyle(exceeded);

  const validateContent = (
    _: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    return ValidationOfRedactorValue({
      maxCharacters: aboutFormRules.about.maxCharacters,
      message: t.dashboard.contacts.form.about,
      value,
      callback,
      isCanEmpty: true,
    });
  };

  const breadcrumbs = [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({
      key: routes.dashboard.index,
      text: t.dashboard.indexTitle,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.contacts.index,
      text: t.dashboard.contacts.index,
      withLink: false,
    }),
  ];

  return (
    <Flex gap="large" vertical>
      <Flex justify="space-between">
        <Breadcrumb items={breadcrumbs} />

        <DashboardSelectLanguage />
      </Flex>

      <Spin size="large" spinning={isFetching}>
        <Form
          layout="vertical"
          fields={fields}
          form={form}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
          onFinish={onFinish}
        >
          <Col span={24} style={{ marginBottom: 16 }}>
            <Card>
              <Form.Item
                label={t.dashboard.contacts.form.about.label}
                name="about"
                validateFirst
                rules={[
                  { validator: validateContent },
                  ...aboutFormRules.about.rules,
                ]}
                hasFeedback
                tooltip={<span>{t.dashboard.contacts.form.about.tooltip}</span>}
              >
                <ReactQuill
                  theme="snow"
                  value={aboutText}
                  onChange={(value) => {
                    setAboutText(value);
                    form.setFieldValue('about', value);
                  }}
                  style={quillStyle}
                />
              </Form.Item>

              <QuillCharacterCount
                characterCount={characterCount}
                maxCount={aboutFormRules.about.maxCharacters}
              />
            </Card>
          </Col>

          <Row gutter={[16, 16]}>
            <Col span={24} lg={12}>
              <Card>
                <Form.Item
                  name={['socialNetworks', 'facebook']}
                  label={
                    t.dashboard.contacts.form.socialNetworks.facebook.label
                  }
                  rules={[
                    { whitespace: true },
                    {
                      type: 'url',
                      message:
                        t.dashboard.contacts.form.socialNetworks.facebook.rules
                          .url,
                    },
                    {
                      max: 120,
                      message:
                        t.dashboard.contacts.form.socialNetworks.facebook.rules
                          .max,
                    },
                  ]}
                  hasFeedback
                  tooltip={
                    t.dashboard.contacts.form.socialNetworks.facebook.tooltip
                  }
                >
                  <Input
                    placeholder={
                      t.dashboard.contacts.form.socialNetworks.facebook
                        .placeholder
                    }
                    count={{
                      show: true,
                      max: 120,
                    }}
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name={['socialNetworks', 'telegram']}
                  label={
                    t.dashboard.contacts.form.socialNetworks.telegram.label
                  }
                  rules={[
                    { whitespace: true },
                    {
                      type: 'url',
                      message:
                        t.dashboard.contacts.form.socialNetworks.facebook.rules
                          .url,
                    },
                    {
                      max: 120,
                      message:
                        t.dashboard.contacts.form.socialNetworks.telegram.rules
                          .max,
                    },
                  ]}
                  hasFeedback
                  tooltip={
                    t.dashboard.contacts.form.socialNetworks.telegram.tooltip
                  }
                >
                  <Input
                    placeholder={
                      t.dashboard.contacts.form.socialNetworks.telegram
                        .placeholder
                    }
                    count={{
                      show: true,
                      max: 120,
                    }}
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name={['socialNetworks', 'instagram']}
                  label={
                    t.dashboard.contacts.form.socialNetworks.instagram.label
                  }
                  rules={[
                    { whitespace: true },
                    {
                      type: 'url',
                      message:
                        t.dashboard.contacts.form.socialNetworks.facebook.rules
                          .url,
                    },
                    {
                      max: 120,
                      message:
                        t.dashboard.contacts.form.socialNetworks.instagram.rules
                          .max,
                    },
                  ]}
                  hasFeedback
                  tooltip={
                    t.dashboard.contacts.form.socialNetworks.instagram.tooltip
                  }
                >
                  <Input
                    placeholder={
                      t.dashboard.contacts.form.socialNetworks.instagram
                        .placeholder
                    }
                    count={{
                      show: true,
                      max: 120,
                    }}
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name={['socialNetworks', 'partners']}
                  label={
                    t.dashboard.contacts.form.socialNetworks.partners.label
                  }
                  rules={[
                    { whitespace: true },
                    {
                      max: 120,
                      message:
                        t.dashboard.contacts.form.socialNetworks.partners.rules
                          .max,
                    },
                  ]}
                  hasFeedback
                  tooltip={
                    t.dashboard.contacts.form.socialNetworks.partners.tooltip
                  }
                >
                  <Input
                    placeholder={
                      t.dashboard.contacts.form.socialNetworks.partners
                        .placeholder
                    }
                    count={{
                      show: true,
                      max: 120,
                    }}
                    allowClear
                  />
                </Form.Item>
              </Card>
            </Col>

            <Col span={24} lg={12}>
              <Flex vertical gap="middle">
                <Card>
                  <Form.Item
                    name="address"
                    label={t.dashboard.contacts.form.address.label}
                    rules={[
                      { whitespace: true },
                      {
                        required: true,
                        message:
                          t.dashboard.contacts.form.address.rules.required,
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder={
                        t.dashboard.contacts.form.address.placeholder
                      }
                      count={{
                        show: true,
                        max: 120,
                      }}
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label={t.dashboard.contacts.form.email.label}
                    rules={[
                      { whitespace: true },
                      {
                        required: true,
                        message: t.dashboard.contacts.form.email.rules.required,
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder={t.dashboard.contacts.form.email.placeholder}
                      count={{
                        show: true,
                        max: 120,
                      }}
                      allowClear
                    />
                  </Form.Item>

                  {/* <Form.Item */}
                  {/*  name="phone" */}
                  {/*  label="Phone" */}
                  {/*  rules={[{ whitespace: true }]} */}
                  {/*  hasFeedback */}
                  {/*  tooltip="This field is optional. If you want to show phone number on the site, you need to fill in this field." */}
                  {/* > */}
                  {/*  <Input placeholder="Input phone" allowClear /> */}
                  {/* </Form.Item> */}
                </Card>

                <Card style={{ marginTop: 4 }}>
                  <Form.Item>
                    <List split={false}>
                      <List.Item>
                        <Typography.Text>
                          <span className="text-neutral-400">
                            {t.dashboard.contacts.form.updatedAt}: &nbsp;
                          </span>
                          {convertDateToFormat(selectedContacts?.updatedAt)}
                        </Typography.Text>
                      </List.Item>
                    </List>
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isUpdating}
                    icon={<SaveOutlined />}
                  >
                    {t.dashboard.contacts.form.save}
                  </Button>
                </Card>
              </Flex>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Flex>
  );
};
