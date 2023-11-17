import React, { FC, useEffect, useState } from 'react';
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
import { routes } from '@/common/routing/routes';
import { useContacts } from '@/modules/contacts-module/hooks/useContacts';
import { useUpdateContacts } from '@/modules/contacts-module/hooks/useUpdateContacts';
import { IContacts, IContactsForm } from '@/types';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
  CreateBreadcrumb({
    key: routes.dashboard.contacts.index,
    text: 'Contacts',
    withLink: false,
  }),
];

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export const Contacts: FC = () => {
  const { contacts, isFetching } = useContacts();
  const { updateContactsMutate, isUpdating } = useUpdateContacts();

  const [form] = Form.useForm();
  const [fields, setFields] = useState<FieldData[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<IContacts>();

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
      });
      setSelectedContacts(contacts);
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
    };

    updateContactsMutate(
      { data: form },
      {
        onSuccess: () => {
          notification.success({
            message: 'Contacts updated successfully',
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

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
          <Row gutter={[16, 16]}>
            <Col span={24} lg={12}>
              <Card>
                <Form.Item
                  name={['socialNetworks', 'facebook']}
                  label="Facebook"
                  rules={[{ whitespace: true }]}
                  hasFeedback
                  tooltip='You need to enter a link to the group or page in the format "https://www.facebook.com/...".'
                >
                  <Input placeholder="Input link" allowClear />
                </Form.Item>

                <Form.Item
                  name={['socialNetworks', 'telegram']}
                  label="Telegram"
                  rules={[{ whitespace: true }]}
                  hasFeedback
                  tooltip='You need to enter a link to the group or channel in the format "https://t.me/...".'
                >
                  <Input placeholder="Input link" allowClear />
                </Form.Item>

                <Form.Item
                  name={['socialNetworks', 'instagram']}
                  label="Instagram"
                  rules={[{ whitespace: true }]}
                  hasFeedback
                  tooltip='You need to enter a link to the group or page in the format "https://www.instagram.com/...".'
                >
                  <Input placeholder="Input link" allowClear />
                </Form.Item>

                <Form.Item
                  name={['socialNetworks', 'partners']}
                  label="Partners"
                  rules={[{ whitespace: true }]}
                  hasFeedback
                  tooltip="You need to enter a link to the group or page."
                >
                  <Input placeholder="Input phone" allowClear />
                </Form.Item>
              </Card>
            </Col>

            <Col span={24} lg={12}>
              <Flex vertical gap="middle">
                <Card>
                  <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ whitespace: true, required: true }]}
                    hasFeedback
                  >
                    <Input placeholder="Input address" allowClear />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ whitespace: true, required: true }]}
                    hasFeedback
                  >
                    <Input placeholder="Input email" allowClear />
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
                            Updated At: &nbsp;
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
                    Save
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
