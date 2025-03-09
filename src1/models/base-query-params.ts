import { PaginationParams } from "./pagination";
import { SortOrder } from "./sort-order";

export interface BaseQueryParams extends PaginationParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}

export interface IBaseQueryBuilder<T> {
  // Main query builder method
  buildQuery(queryParams: T): {
    search: string;
    page: number;
    pageSize: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filter: Partial<T>;
  };

  // Protected methods as they were in the class
  buildFilter(queryParams: T): Partial<T>;

  buildSort(queryParams: T): SortOrder;

  buildPagination(queryParams: T): {
    page: number;
    pageSize: number;
  };

  buildSearch(queryParams: T): string;

  applyFilter(data: T[], queryParams: T): T[];

  applySorting(data: T[], queryParams: T): T[];
}
