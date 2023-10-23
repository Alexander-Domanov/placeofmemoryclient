import React, { useState } from 'react';
import { Button, List, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { IPlace } from '@/types';
import { useDeletePlace } from '@/modules/places-modules/hooks/useDeletePlace';

interface DeletePlaceComponentProps {
  place: IPlace | null;
}
const DeletePlaceComponent: React.FC<DeletePlaceComponentProps> = ({
  place,
}) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<IPlace | null>(null);

  const { deletePlaceMutation } = useDeletePlace();

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };
  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const deletePlace = () => {
    deletePlaceMutation(selectedPlace?.id || null, {
      onSuccess: () => {
        notification.success({
          message: `Place: ${selectedPlace?.nameCemetery} deleted successfully`,
          placement: 'bottomLeft',
        });
      },
      onError: (data: any) => {
        const errors = data.response.data.messages as any[];
        if (errors.length > 0) {
          notification.error({
            message: `Error: ${errors[0].message}`,
            placement: 'bottomLeft',
          });
        }
      },
    });
    setDeleteModalVisible(false);
  };

  return (
    <>
      <List.Item
        actions={[
          <Button
            key={0}
            icon={<DeleteOutlined />}
            style={{ cursor: 'pointer', color: '#ef2020' }}
            onClick={() => {
              setSelectedPlace(place);
              showDeleteModal();
            }}
            ghost
          />,
        ]}
      />
      <Modal
        title="Confirm deletion"
        open={isDeleteModalVisible}
        onOk={deletePlace}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <Space>
          <div className="site-description-item-profile-wrapper">
            <span className="font-normal text-neutral-400">
              Are you sure you want to delete the place:{' '}
            </span>
            <span className="font-normal text-start">
              {selectedPlace?.nameCemetery}
            </span>
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DeletePlaceComponent;
