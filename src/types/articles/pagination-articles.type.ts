import { IPagination } from '@/types';

export interface IPaginationArticles extends Omit<IPagination, 'name'> {
  title: string;
}
