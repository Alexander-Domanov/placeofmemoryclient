import { Button, Modal } from 'antd';
import React, { ReactNode } from 'react';

interface IModalLanguage {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  children: ReactNode;
  title: string;
  showButtonFooter?: boolean;
  handleCancelCallBack: () => void;
}
export const ModalLanguage = ({
  setIsModalOpen,
  isModalOpen,
  children,
  title,
  showButtonFooter = false,
  handleCancelCallBack,
}: IModalLanguage) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    handleCancelCallBack();
  };
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        showButtonFooter && [
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]
      }
    >
      {children}
    </Modal>
  );
};
