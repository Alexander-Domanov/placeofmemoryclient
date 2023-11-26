import { FC, useState } from 'react';
import { Button, List, Modal, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ILanguageListItem } from '@/types';
import { useDeleteLanguage } from '@/modules/language-module';
import { useTranslation } from '@/components/internationalization';

interface DeleteLanguageModalProps {
  language: ILanguageListItem | null;
}

const DeleteLanguageComponent: FC<DeleteLanguageModalProps> = ({
  language,
}) => {
  const { t } = useTranslation();

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<ILanguageListItem | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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
            message: t.dashboard.languages.notifications.delete.title,
            placement: 'bottomLeft',
          });
        },
      }
    );
    setDeleteModalVisible(false);
  };

  const handleClick = () => {
    setSelectedLanguage(language);
    showDeleteModal();
  };

  const buttonStyle = {
    cursor: 'pointer',
    color: '#ef2020',
  };

  return (
    <>
      <List.Item
        key={language?.id}
        actions={[
          <Button
            key="delete"
            title={t.dashboard.languages.delete.title}
            icon={<DeleteOutlined />}
            style={buttonStyle}
            onClick={handleClick}
            ghost
          />,
        ]}
      />

      <Modal
        title={t.dashboard.languages.delete.title}
        open={isDeleteModalVisible}
        onOk={deleteLanguage}
        onCancel={handleDeleteCancel}
        okText={t.dashboard.languages.delete.delete}
        cancelText={t.dashboard.languages.delete.cancel}
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
              {t.dashboard.languages.delete.description}: &nbsp;
            </span>
            {selectedLanguage?.name}
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DeleteLanguageComponent;
