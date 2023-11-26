import React, { useState } from 'react';
import { Button, Form, List, Modal, notification, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { IPerson, Role } from '@/types';
import { useUpdatePersonStatus } from '@/modules/persons-module/hooks/useUpdatePersonStatus';
import { useMeQuery } from '@/services';
import { GetDisabledStatus } from '@/common-dashboard';
import { GetUpdateOptions } from '@/components';
import { routes } from '@/common/routing/routes';
import { useTranslation } from '@/components/internationalization';

interface UpdatePersonStatusComponentProps {
  person: IPerson | null;
}
const UpdatePersonStatusComponent: React.FC<
  UpdatePersonStatusComponentProps
> = ({ person }) => {
  const { t } = useTranslation();
  const { data: me } = useMeQuery();
  const router = useRouter();

  const { id, status } = person || { id: null, status: null };
  const stringId = id !== null ? id.toString() : null;
  const [isModalVisible, setModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  const { updateStatusPerson } = useUpdatePersonStatus();

  const handleEditClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleMenuStatusClick = (status: string) => {
    setNewStatus(status);
    updateStatusPerson(
      { id: stringId, status },
      {
        onSuccess: () => {
          notification.success({
            message: t.dashboard.persons.updateModal.notification.success,
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const updateOptions = GetUpdateOptions(t, me);

  const isDisabled = GetDisabledStatus(status as string, me?.role as Role);

  const buttonStyle = {
    cursor: 'pointer',
    color: '#2c332c',
    // ...(isDisabled && { opacity: 0.5, cursor: 'not-allowed' }),
  };

  return (
    <>
      <List.Item
        actions={[
          <Button
            key={0}
            icon={<EditOutlined />}
            style={buttonStyle}
            onClick={handleEditClick}
            ghost
            // disabled={isDisabled}
          />,
        ]}
      />
      <Modal
        title={t.dashboard.persons.updateModal.title}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {isDisabled ? (
          <Form>
            <Form.Item
              label={t.dashboard.persons.updateModal.form.label}
              style={{ marginBottom: 10 }}
            >
              <Select
                value={newStatus}
                onChange={handleMenuStatusClick}
                disabled
              >
                {updateOptions}
              </Select>
            </Form.Item>

            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                router.push(routes.dashboard.persons.person(id || ''));
              }}
            >
              {t.dashboard.articles.updateModal.edit}
            </Button>
          </Form>
        ) : (
          <Form>
            <Form.Item
              label={t.dashboard.persons.updateModal.form.label}
              style={{ marginBottom: 10 }}
            >
              <Select value={newStatus} onChange={handleMenuStatusClick}>
                {updateOptions}
              </Select>
            </Form.Item>

            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                router.push(routes.dashboard.persons.person(id || ''));
              }}
            >
              {t.dashboard.articles.updateModal.edit}
            </Button>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UpdatePersonStatusComponent;
