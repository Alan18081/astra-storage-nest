export interface PaginatedResponse<T> {
    page: number;
    itemsPerPage: number;
    totalCount: number;
    data: T[];
}
