import { authInstance } from '@/services';
import { IGetUsersResponse } from '@/types/users/get-users-response.type';
import { IUser } from '@/types';

export const getUsers = (
  page: number,
  pageSize: number,
  status: string,
  role: string,
  userName: string,
  sorting: { field: string | null | number | bigint; order: string | null },
  extensions: string[] = []
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
      extensions,
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

export const getUser = (id: string | undefined | string[]) => {
  return authInstance.get<IUser>(`users/${id}`);
};
