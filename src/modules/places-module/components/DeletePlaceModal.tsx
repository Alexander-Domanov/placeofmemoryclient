import React, { FC, useEffect, useState } from 'react';
import { Button, List, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { IPlace, StatusUser } from '@/types';
import { useDeletePlace } from '@/modules/places-module/hooks/useDeletePlace';
import { routes } from '@/common/routing/routes';
import { useTranslation } from '@/components/internationalization';
import { useMeQuery } from '@/services';

interface DeletePlaceModalProps {
  place: IPlace | null;
}

const DeletePlaceComponent: FC<DeletePlaceModalProps> = ({ place }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: me } = useMeQuery();

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<IPlace | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { deletePlaceMutationAsync } = useDeletePlace();

  useEffect(() => {
    if (me?.status === StatusUser.BANNED) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [me?.status]);

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
          message: t.dashboard.places.notifications.delete.title,
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
    ...(isDisabled && { opacity: 0.5, cursor: 'not-allowed' }),
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
            title={t.dashboard.places.delete.title}
            icon={<DeleteOutlined />}
            style={buttonStyle}
            onClick={handleClick}
            ghost
            disabled={isDisabled}
          />,
        ]}
      />

      <Modal
        title={t.dashboard.places.delete.titleConfirm}
        open={isDeleteModalVisible}
        onOk={deletePlace}
        onCancel={handleDeleteCancel}
        okText={t.dashboard.places.delete.delete}
        cancelText={t.dashboard.places.delete.cancel}
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
              {t.dashboard.places.delete.description}: &nbsp;
            </span>
            {selectedPlace?.nameCemetery}
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DeletePlaceComponent;
