import React, { useState } from 'react';
import { Button, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ILanguageListItem } from '@/types';
import { useDeleteLanguage } from '@/modules/language-module';

interface DeleteLanguageModalProps {
  language: ILanguageListItem | null;
  showButton: boolean;
}

const DeleteLanguageModal: React.FC<DeleteLanguageModalProps> = ({
  language,
  showButton,
}) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<ILanguageListItem | null>(null);

  const { mutateDeleteLanguage, isDeleting } = useDeleteLanguage();

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const deleteLanguage = () => {
    mutateDeleteLanguage(
      { languageID: selectedLanguage?.id as number },
      {
        onSuccess: () => {
          notification.success({
            message: `Language ${selectedLanguage?.name} deleted`,
            placement: 'bottomLeft',
          });
        },
      }
    );
    setDeleteModalVisible(false);
  };

  const showButtonDelete = (showButton: boolean) => {
    const handleClick = () => {
      setSelectedLanguage(language);
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
        disabled={language?.id === selectedLanguage?.id && !isDeleting}
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
        onOk={deleteLanguage}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <Space>
          <div className="site-description-item-profile-wrapper">
            <span className="font-normal text-neutral-400">
              Are you sure you want to delete the language:
            </span>
            <span className="font-normal text-start">
              {selectedLanguage?.name}
            </span>
          </div>
        </Space>
      </Modal>
      <Modal
        title="Confirm deletion"
        open={isDeleteModalVisible}
        onOk={deleteLanguage}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <Space>
          <div className="site-description-item-profile-wrapper">
            <span className="font-normal text-neutral-400">
              Are you sure you want to delete the language:
            </span>
            <span className="font-normal text-start">
              {selectedLanguage?.name}
            </span>
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DeleteLanguageModal;
