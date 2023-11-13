import { IPagination } from '@/types';

export interface IPaginationUser extends IPagination {
  id: string;
  extensions: string[];
}
