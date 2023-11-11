export interface IPagination {
  page: number;
  pageSize: number;
  name: string;
  status: string;
  sorting: { field: string | null | number | bigint; order: string | null };
}
