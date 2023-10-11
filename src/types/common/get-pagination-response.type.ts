export interface IGetPaginationResponse<T> {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  items: T;
}
