import { IPagination } from '@/types';

export interface IPaginationArticles extends Omit<IPagination, 'name'> {
  title: string;
  lang?: string;
}

export interface IPaginationPublicArticles {
  title: string;
  pageSize: number;
  lang?: string;
}
