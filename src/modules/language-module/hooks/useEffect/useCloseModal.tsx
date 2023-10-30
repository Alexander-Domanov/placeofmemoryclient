import React, { useEffect } from 'react';

interface UseCloseModalProps {
  isModalOpen: boolean;
  isSuccessCreateLanguage: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useCloseModal = ({
  isModalOpen,
  isSuccessCreateLanguage,
  setIsModalOpen,
}: UseCloseModalProps) => {
  useEffect(() => {
    if (isModalOpen) setIsModalOpen(false);
  }, [isSuccessCreateLanguage]);
};
