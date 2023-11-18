import React, { FC, useState } from 'react';
import { Button, List, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { IPlace } from '@/types';
import { useDeletePlace } from '@/modules/places-module/hooks/useDeletePlace';
import { routes } from '@/common/routing/routes';

interface DeletePlaceModalProps {
  place: IPlace | null;
}

const DeletePlaceComponent: FC<DeletePlaceModalProps> = ({ place }) => {
  const router = useRouter();

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<IPlace | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { deletePlaceMutationAsync } = useDeletePlace();

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const deletePlace = () => {
    deletePlaceMutationAsync(selectedPlace?.id || null, {
      onSuccess: () => {
        notification.success({
          message: `Place: ${selectedPlace?.nameCemetery} deleted successfully`,
          placement: 'bottomLeft',
        });
        router.push(routes.dashboard.places.index);
      },
    });
    setDeleteModalVisible(false);
  };

  const buttonStyle = {
    cursor: 'pointer',
    color: '#ef2020',
  };

  const handleClick = () => {
    setSelectedPlace(place);
    showDeleteModal();
  };

  return (
    <>
      <List.Item
        key={place?.id}
        actions={[
          <Button
            key="delete"
            title="Delete"
            icon={<DeleteOutlined />}
            style={buttonStyle}
            onClick={handleClick}
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
        okButtonProps={{
          icon: <DeleteOutlined />,
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
          style: {
            cursor: 'pointer',
            color: isHovered ? '#fff' : '#ef2020',
            backgroundColor: isHovered ? '#ef2020' : 'transparent',
            border: isHovered ? '1px solid #ef2020' : '1px solid #d9d9d9',
          },
        }}
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
        okButtonProps={{
          icon: <DeleteOutlined />,
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
          style: {
            cursor: 'pointer',
            color: isHovered ? '#fff' : '#ef2020',
            backgroundColor: isHovered ? '#ef2020' : 'transparent',
            border: isHovered ? '1px solid #ef2020' : '1px solid #d9d9d9',
          },
        }}
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

export default DeletePlaceComponent;
