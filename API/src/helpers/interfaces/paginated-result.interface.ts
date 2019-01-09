export interface PaginatedResult<T> {
  page: number;
  itemsPerPage: number;
  totalCount: number;
  data: T[];
}