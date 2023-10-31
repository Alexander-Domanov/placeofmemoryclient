import { useEffect, useState } from 'react';

interface UseCloseModalProps {
  isSuccessLanguage: boolean;
}

export const useOpenCloseModal = ({
  isSuccessLanguage,
}: UseCloseModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isModalOpen) setIsModalOpen(false);
  }, [isSuccessLanguage]);

  return { isModalOpen, setIsModalOpen };
};
