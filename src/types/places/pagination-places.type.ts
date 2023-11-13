import { IPagination } from '@/types/common/pagination.type';

export interface IPaginationPlaces extends IPagination {
  country: string;
  city: string;
}
