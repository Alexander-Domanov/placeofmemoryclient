import React, { useState } from 'react';
import { Button, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { IPlace } from '@/types';
import { useDeletePlace } from '@/modules/places-module/hooks/useDeletePlace';

interface DeletePlaceModalProps {
  place: IPlace | null;
  showButton: boolean;
}

const DeletePlaceModal: React.FC<DeletePlaceModalProps> = ({
  place,
  showButton,
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
    });
    setDeleteModalVisible(false);
  };

  const showButtonDelete = (showButton: boolean) => {
    const handleClick = () => {
      setSelectedPlace(place);
      showDeleteModal();
    };

    if (showButton) {
      return (
        <Button
          danger
          type="primary"
          title="Delete"
          icon={<DeleteOutlined />}
          style={{ cursor: 'pointer', color: '#ef2020' }}
          onClick={handleClick}
          ghost
        >
          Delete
        </Button>
      );
    }
    return (
      <Button
        title="Delete"
        icon={<DeleteOutlined />}
        style={{ cursor: 'pointer', color: '#ef2020' }}
        onClick={handleClick}
        ghost
      />
    );
  };

  return (
    <>
      {showButtonDelete(showButton)}
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
            <span className="text-neutral-400">
              Are you sure you want to delete the place: &nbsp;
            </span>
            {selectedPlace?.nameCemetery}
          </div>
        </Space>
      </Modal>
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
            <span className="text-neutral-400">
              Are you sure you want to delete the place: &nbsp;
            </span>
            {selectedPlace?.nameCemetery}
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DeletePlaceModal;
