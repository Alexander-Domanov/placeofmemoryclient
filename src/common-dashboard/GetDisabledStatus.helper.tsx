import { Role, Statuses } from '@/types';

export const GetDisabledStatus = (status: string, role: Role) =>
  status === Statuses.PUBLISHED && (role === Role.AUTHOR || role === Role.USER);
