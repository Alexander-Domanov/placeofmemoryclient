import React, { useState } from 'react';
import { Button, Form, List, Modal, notification, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { IPerson, Role } from '@/types';
import { useUpdatePersonStatus } from '@/modules/persons-module/hooks/useUpdatePersonStatus';
import { useMeQuery } from '@/services';
import { GetUpdateOptions } from '@/common-dashboard/GetUpdateOptions';
import { GetDisabledStatus } from '@/common-dashboard/GetDisabledStatus.helper';

interface UpdatePersonStatusComponentProps {
  person: IPerson | null;
}
const UpdatePersonStatusComponent: React.FC<
  UpdatePersonStatusComponentProps
> = ({ person }) => {
  const { data: me } = useMeQuery();

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
            message: `Changed status to: ${status} for person: ${person?.firstName}`,
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const updateOptions = GetUpdateOptions(me);

  const isDisabled = GetDisabledStatus(status as string, me?.role as Role);

  const buttonStyle = {
    cursor: 'pointer',
    color: '#2c332c',
    ...(isDisabled && { opacity: 0.5, cursor: 'not-allowed' }),
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
            disabled={isDisabled}
          />,
        ]}
      />
      <Modal
        title="Set new status"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {isDisabled ? (
          <Form.Item label="Current status" style={{ marginBottom: 10 }}>
            <Select value={newStatus} onChange={handleMenuStatusClick} disabled>
              {updateOptions}
            </Select>
          </Form.Item>
        ) : (
          <Form.Item label="Current status" style={{ marginBottom: 10 }}>
            <Select value={newStatus} onChange={handleMenuStatusClick}>
              {updateOptions}
            </Select>
          </Form.Item>
        )}
      </Modal>
    </>
  );
};

export default UpdatePersonStatusComponent;
