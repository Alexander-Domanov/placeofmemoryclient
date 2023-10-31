import React, { useState } from 'react';
import { Button, Form, List, Modal, notification, Select } from 'antd';
import {
  ClockCircleOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { IPlace } from '@/types';
import { useUpdatePlaceStatus } from '@/modules/places-module/hooks/useUpdatePlaceStatus';

const { Option } = Select;

interface UpdatePlaceStatusComponentProps {
  place: IPlace | null;
}
const UpdatePlaceStatus: React.FC<UpdatePlaceStatusComponentProps> = ({
  place,
}) => {
  const { id, status } = place || {
    id: null,
    status: null,
  };
  const stringId = id !== null ? id.toString() : null;
  const [isModalVisible, setModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  const { updateStatusPlace } = useUpdatePlaceStatus();

  const handleEditClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleMenuStatusClick = (status: string) => {
    setNewStatus(status);
    updateStatusPlace(
      { id: stringId, status },
      {
        onSuccess: () => {
          notification.success({
            message: `Changed status to: ${status} for place: ${place?.nameCemetery}`,
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
            title="Change status"
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

export default UpdatePlaceStatus;
