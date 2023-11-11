import { IPagination } from '@/types/common/pagination.type';

export interface IPaginationPersons extends IPagination {
  searchLastName: string;
  startDate?: string;
  endDate?: string;
}
