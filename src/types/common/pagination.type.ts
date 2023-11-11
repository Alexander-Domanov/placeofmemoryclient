export interface IPagination {
  page: number;
  pageSize: number;
  searchName: string;
  status: string;
  sorting: { field: string | null | number | bigint; order: string | null };
}
