import { FC, useState } from 'react';
import { Button, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { IPerson, Role } from '@/types';
import { useDeletePerson } from '@/modules/persons-module/hooks/useDeletePerson';
import { useMeQuery } from '@/services';
import { GetDisabledStatus } from '@/common-dashboard/GetDisabledStatus.helper';

interface DeletePersonModalProps {
  person: IPerson | null;
  showButton: boolean;
}

const DeletePersonModal: FC<DeletePersonModalProps> = ({
  person,
  showButton,
}) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<IPerson | null>(null);

  const { deletePersonMutation } = useDeletePerson();
  const { data: me } = useMeQuery();

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const deletePerson = () => {
    deletePersonMutation(selectedPerson?.id || null, {
      onSuccess: () => {
        notification.success({
          message: `Person: ${selectedPerson?.firstName} deleted successfully`,
          placement: 'bottomLeft',
        });
      },
    });
    setDeleteModalVisible(false);
  };

  const isDisabled = GetDisabledStatus(
    person?.status as string,
    me?.role as Role
  );

  const showButtonDelete = (showButton: boolean) => {
    const handleClick = () => {
      setSelectedPerson(person);
      showDeleteModal();
    };

    const buttonStyle = {
      cursor: 'pointer',
      color: '#ef2020',
      ...(isDisabled && { opacity: 0.5, cursor: 'not-allowed' }),
    };

    if (showButton) {
      return (
        <Button
          danger
          type="primary"
          title="Delete"
          icon={<DeleteOutlined />}
          style={buttonStyle}
          onClick={handleClick}
          ghost
          disabled={isDisabled}
        >
          Delete
        </Button>
      );
    }
    return (
      <Button
        title="Delete"
        icon={<DeleteOutlined />}
        style={buttonStyle}
        onClick={handleClick}
        ghost
        disabled={isDisabled}
      />
    );
  };

  return (
    <>
      {showButtonDelete(showButton)}
      <Modal
        title="Confirm deletion"
        open={isDeleteModalVisible}
        onOk={deletePerson}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <Space>
          <div className="site-description-item-profile-wrapper">
            <span className="text-neutral-400">
              Are you sure you want to delete the person: &nbsp;
            </span>
            {selectedPerson?.firstName}
          </div>
        </Space>
      </Modal>
      <Modal
        title="Confirm deletion"
        open={isDeleteModalVisible}
        onOk={deletePerson}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <Space>
          <div className="site-description-item-profile-wrapper">
            <span className="text-neutral-400">
              Are you sure you want to delete the person: &nbsp;
            </span>
            {selectedPerson?.firstName}
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DeletePersonModal;
