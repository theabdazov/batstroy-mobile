export interface Pagination {
  page: number;
  count: number;
}

export interface PaginationPage<T> {
  data: T[];
  totalCount: number;
}
