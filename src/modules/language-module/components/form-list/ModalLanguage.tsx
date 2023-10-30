import { Button, Modal } from 'antd';
import { ReactNode } from 'react';

interface IModalLanguage {
  setIsModalOpen: (isModalOpen: boolean) => void;
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
