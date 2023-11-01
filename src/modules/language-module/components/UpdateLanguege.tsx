import React, { useState } from 'react';
import { Button, Form, Input, List, Modal, notification } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { ILanguageListItem } from '@/types';
import { FORM_ITEMS, useUpdateLanguage } from '@/modules/language-module';

interface UpdateLanguageComponentProps {
  language: ILanguageListItem | null;
}
const UpdateLanguage: React.FC<UpdateLanguageComponentProps> = ({
  language,
}) => {
  const { id } = language || {
    id: null,
  };
  const stringId = id !== null ? id.toString() : null;
  const [isModalVisible, setModalVisible] = useState(false);

  const { mutateUpdateLanguage, isUpdating } = useUpdateLanguage();

  const [form] = Form.useForm();

  form.setFieldsValue({
    name: language?.name,
    native: language?.native,
    code: language?.code,
    order: language?.order,
  });

  const handleEditClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const onFinish = (values: any) => {
    mutateUpdateLanguage(
      { languageID: stringId, ...values },
      {
        onSuccess: () => {
          notification.success({
            message: `Language ${values.name} was successfully updated`,
            placement: 'bottomLeft',
          });
          setModalVisible(false);
        },
      }
    );
  };

  return (
    <>
      <List.Item
        actions={[
          <Button
            title="Edit"
            key={0}
            icon={<EditOutlined />}
            style={{ cursor: 'pointer', color: '#2c332c' }}
            onClick={handleEditClick}
            ghost
          />,
        ]}
      />
      <Modal
        title="Set new status"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
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
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={isUpdating}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateLanguage;
