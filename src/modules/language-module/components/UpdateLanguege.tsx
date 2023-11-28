import React, { useEffect, useState } from 'react';
import { Button, Form, Input, List, Modal, notification } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { ILanguageListItem } from '@/types';
import { FORM_ITEMS, useUpdateLanguage } from '@/modules/language-module';
import { useTranslation } from '@/components/internationalization';

interface UpdateLanguageComponentProps {
  language: ILanguageListItem | null;
}
const UpdateLanguage: React.FC<UpdateLanguageComponentProps> = ({
  language,
}) => {
  const { t } = useTranslation();
  const formItems = FORM_ITEMS(t);

  const { id } = language || {
    id: null,
  };
  const stringId = id !== null ? id.toString() : null;
  const [isModalVisible, setModalVisible] = useState(false);

  const { mutateUpdateLanguage, isUpdating } = useUpdateLanguage();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: language?.name,
      native: language?.native,
      code: language?.code,
      order: language?.order,
    });
  }, [isModalVisible]);

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
            message: t.dashboard.languages.notifications.update.title,
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
            title={t.dashboard.languages.edit.title}
            key={0}
            icon={<EditOutlined />}
            style={{ cursor: 'pointer', color: '#2c332c' }}
            onClick={handleEditClick}
            ghost
          />,
        ]}
      />

      <Modal
        forceRender
        title={t.dashboard.languages.form.titleUpdate}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
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
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={isUpdating}
            >
              {t.dashboard.languages.form.save}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateLanguage;
