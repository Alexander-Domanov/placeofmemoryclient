import { authInstance } from '@/services';
import { IUser } from '@/types/users/user.type';
import { IGetUsersResponse } from '@/types/users/get-users-response.type';
import { IUpdateUser } from '@/types/users/user-update.type';

export const getUsers = (
  page: number,
  pageSize: number,
  status: string,
  role: string,
  userName: string,
  sorting: { field: string | null; order: string | null }
) => {
  return authInstance.get<IGetUsersResponse>('users', {
    params: {
      pageNumber: page,
      pageSize,
      status,
      role,
      userName,
      sortBy: sorting.field,
      sortDirection: sorting.order,
    },
  });
};

export const getUser = (id: number | null) => {
  return authInstance.get<IUser>(`users/${id}`);
};

export const deleteUser = (id: number | undefined) => {
  return authInstance.delete(`users/${id}`);
};

export const updateUser = (id: number | undefined, user: IUpdateUser) => {
  return authInstance.put(`users/${id}`, user);
};
