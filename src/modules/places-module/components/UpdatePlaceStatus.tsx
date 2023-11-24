import React, { useState } from 'react';
import { Button, Form, List, Modal, notification, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { IPlace } from '@/types';
import { useUpdatePlaceStatus } from '@/modules/places-module/hooks/useUpdatePlaceStatus';
import { useMeQuery } from '@/services';
import { GetUpdateOptions } from '@/components';
import { routes } from '@/common/routing/routes';

interface UpdatePlaceStatusComponentProps {
  place: IPlace | null;
}
const UpdatePlaceStatus: React.FC<UpdatePlaceStatusComponentProps> = ({
  place,
}) => {
  const { data: me } = useMeQuery();
  const router = useRouter();

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

  const updateOptions = GetUpdateOptions(me);

  return (
    <>
      <List.Item
        actions={[
          <Button
            title="Change status of place or edit"
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
            {updateOptions}
          </Select>
        </Form.Item>

        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => {
            router.push(routes.dashboard.places.place(id || ''));
          }}
        >
          Edit
        </Button>
      </Modal>
    </>
  );
};

export default UpdatePlaceStatus;
