import { IPagination } from '@/types';

export interface IPaginationUsers extends Omit<IPagination, 'name'> {
  userName: string;
  role: string;
}
