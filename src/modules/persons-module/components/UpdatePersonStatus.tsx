import React, { useState } from 'react';
import { Button, Form, List, Modal, notification, Select } from 'antd';
import {
  ClockCircleOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { IPerson } from '@/types';
import { useUpdatePersonStatus } from '@/modules/persons-module/hooks/useUpdatePersonStatus';

const { Option } = Select;

interface UpdatePersonStatusComponentProps {
  person: IPerson | null;
}
const UpdatePersonStatusComponent: React.FC<
  UpdatePersonStatusComponentProps
> = ({ person }) => {
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

  return (
    <>
      <List.Item
        actions={[
          <Button
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
        <Form.Item label="Current status" style={{ marginBottom: 10 }}>
          <Select value={newStatus} onChange={handleMenuStatusClick}>
            <Option value="DRAFT">
              <EyeInvisibleOutlined /> Draft
            </Option>
            <Option value="PENDING_REVIEW">
              <ClockCircleOutlined /> Send for review
            </Option>
            <Option value="PUBLISHED">
              <EyeOutlined /> Publish
            </Option>
            <Option value="ARCHIVED">
              <InboxOutlined /> Archive
            </Option>
          </Select>
        </Form.Item>
      </Modal>
    </>
  );
};

export default UpdatePersonStatusComponent;
