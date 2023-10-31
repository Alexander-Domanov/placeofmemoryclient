import React from 'react';
import { List } from 'antd';
import { IPerson } from '@/types';
import DeletePersonModal from '@/modules/persons-module/components/DeletePersonModal';

interface DeletePersonComponentProps {
  person: IPerson | null;
}

const DeletePersonComponent: React.FC<DeletePersonComponentProps> = ({
  person,
}) => {
  return (
    <>
      <List.Item
        actions={[
          <DeletePersonModal
            key="delete-modal"
            person={person}
            showButton={false}
          />,
        ]}
      />
    </>
  );
};

export default DeletePersonComponent;
