import { IPagination } from '@/types';

export interface IPaginationPlaces extends IPagination {
  country: string;
  city: string;
  lang?: string;
}
