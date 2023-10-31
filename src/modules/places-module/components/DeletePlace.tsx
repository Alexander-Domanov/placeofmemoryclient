import React from 'react';
import { List } from 'antd';
import { IPlace } from '@/types';
import DeletePlaceModal from './DeletePlaceModal';

interface DeletePlaceComponentProps {
  place: IPlace | null;
}

const DeletePlaceComponent: React.FC<DeletePlaceComponentProps> = ({
  place,
}) => {
  return (
    <>
      <List.Item
        actions={[
          <DeletePlaceModal
            key="delete-modal"
            place={place}
            showButton={false}
          />,
        ]}
      />
    </>
  );
};

export default DeletePlaceComponent;
