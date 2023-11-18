import React, { FC, useState } from 'react';
import { Button, List, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { IPerson, Role } from '@/types';
import { useDeletePerson } from '@/modules/persons-module/hooks/useDeletePerson';
import { useMeQuery } from '@/services';
import { GetDisabledStatus } from '@/common-dashboard';
import { routes } from '@/common/routing/routes';

interface DeletePersonModalProps {
  person: IPerson | null;
}

const DeletePersonComponent: FC<DeletePersonModalProps> = ({ person }) => {
  const router = useRouter();

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<IPerson | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { deletePersonMutationAsync } = useDeletePerson();
  const { data: me } = useMeQuery();

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const deletePerson = () => {
    deletePersonMutationAsync(selectedPerson?.id || null, {
      onSuccess: () => {
        notification.success({
          message: `Person: ${selectedPerson?.firstName} deleted successfully`,
          placement: 'bottomLeft',
        });
        router.push(routes.dashboard.persons.index);
      },
    });
    setDeleteModalVisible(false);
  };

  const isDisabled = GetDisabledStatus(
    person?.status as string,
    me?.role as Role
  );

  const handleClick = () => {
    setSelectedPerson(person);
    showDeleteModal();
  };

  const buttonStyle = {
    cursor: 'pointer',
    color: '#ef2020',
    ...(isDisabled && { opacity: 0.5, cursor: 'not-allowed' }),
  };

  return (
    <>
      <List.Item
        key={person?.id}
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
        onOk={deletePerson}
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
              Are you sure you want to delete the person: &nbsp;
            </span>
            {selectedPerson?.firstName}
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DeletePersonComponent;
