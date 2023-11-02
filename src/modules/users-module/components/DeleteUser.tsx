import React from 'react';
import { List } from 'antd';
import DeleteUserModal from '@/modules/users-module/components/DeleteUserModal';
import { IUser, IUserWithShortExtensions } from '@/types';

interface DeleteUserComponentProps {
  user: IUser | IUserWithShortExtensions | null;
}
const DeleteUserComponent: React.FC<DeleteUserComponentProps> = ({ user }) => {
  return (
    <>
      <List.Item
        actions={[
          <DeleteUserModal key="delete-modal" user={user} showButton={false} />,
        ]}
      />
    </>
  );
};

export default DeleteUserComponent;
