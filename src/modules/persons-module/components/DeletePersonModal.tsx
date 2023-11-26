import React, { FC, useState } from 'react';
import { Button, List, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { IPerson, Role } from '@/types';
import { useDeletePerson } from '@/modules/persons-module/hooks/useDeletePerson';
import { useMeQuery } from '@/services';
import { GetDisabledStatus } from '@/common-dashboard';
import { routes } from '@/common/routing/routes';
import { useTranslation } from '@/components/internationalization';

interface DeletePersonModalProps {
  person: IPerson | null;
}

const DeletePersonComponent: FC<DeletePersonModalProps> = ({ person }) => {
  const router = useRouter();
  const { t } = useTranslation();

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
          message: t.dashboard.persons.notifications.delete.title,
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
            title={t.dashboard.persons.delete.title}
            icon={<DeleteOutlined />}
            style={buttonStyle}
            onClick={handleClick}
            ghost
            disabled={isDisabled}
          />,
        ]}
      />

      <Modal
        title={t.dashboard.persons.delete.titleConfirm}
        open={isDeleteModalVisible}
        onOk={deletePerson}
        onCancel={handleDeleteCancel}
        okText={t.dashboard.persons.delete.delete}
        cancelText={t.dashboard.persons.delete.cancel}
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
              {t.dashboard.persons.delete.description}: &nbsp;
            </span>
            {selectedPerson?.firstName}
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DeletePersonComponent;
