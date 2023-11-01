import React from 'react';
import { List } from 'antd';
import { ILanguageListItem } from '@/types';
import DeleteLanguageModal from '@/modules/language-module/components/DeleteLanguageModal';

interface DeletePlaceComponentProps {
  language: ILanguageListItem | null;
}

const DeleteLanguageComponent: React.FC<DeletePlaceComponentProps> = ({
  language,
}) => {
  return (
    <>
      <List.Item
        actions={[
          <DeleteLanguageModal
            key="delete-modal"
            language={language}
            showButton={false}
          />,
        ]}
      />
    </>
  );
};

export default DeleteLanguageComponent;
