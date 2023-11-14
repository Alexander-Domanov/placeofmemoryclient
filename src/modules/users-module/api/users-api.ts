import { authInstance } from '@/services';
import {
  IGetUsersResponse,
  IPaginationUser,
  IPaginationUsers,
  IUser,
} from '@/types';

export const getUsers = (data: IPaginationUsers) => {
  return authInstance.get<IGetUsersResponse>('users', {
    params: {
      ...data,
      sortBy: data.sorting.field,
      sortDirection: data.sorting.order,
    },
  });
};

export const deleteUser = (id: number | null) => {
  return authInstance.delete(`users/${id}`);
};

export const updateUserRole = (id: number | null, role: string) => {
  return authInstance.put(`users/${id}/role`, { role });
};

export const updateUserStatus = (id: number | null, status: string) => {
  return authInstance.put(`users/${id}/status`, { status });
};

export const getUser = (data: IPaginationUser) => {
  return authInstance.get<IUser>(`users/${data.id}`, {
    params: {
      ...data,
      sortBy: data.sorting.field,
      sortDirection: data.sorting.order,
    },
  });
};
