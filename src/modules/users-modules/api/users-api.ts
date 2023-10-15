import { authInstance } from '@/services';
import { IUserWithShortExtensions } from '@/types/users/user.type';
import { IGetUsersResponse } from '@/types/users/get-users-response.type';

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

export const getUser = (id: number | null) => {
  return authInstance.get<IUserWithShortExtensions>(`users/${id}`);
};

export const deleteUser = (id: number | null) => {
  return authInstance.delete(`users/${id}`);
};

export const updateUserRole = (id: number | undefined, role: string) => {
  return authInstance.put(`users/${id}/role`, { role });
};

export const updateUserStatus = (id: number | undefined, status: string) => {
  return authInstance.put(`users/${id}/status`, { status });
};
