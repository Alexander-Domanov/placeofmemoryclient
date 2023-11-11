import { IPagination } from '@/types/common/pagination.type';

export interface IPaginationPersons extends IPagination {
  lastName: string;
  startDate?: string | null;
  endDate?: string | null;
}
