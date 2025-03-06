import { BaseQueryParams } from "../models/base-query-params";
import { SortOrder } from "../models/sort-order";

// Abstract Query Builder
export abstract class BaseQueryBuilder<T extends BaseQueryParams> {
  // Abstract method for filtering - to be implemented by child classes
  abstract buildFilter(queryParams: T): Partial<T>;

  // Default sorting implementation
  buildSort(queryParams: T): SortOrder {
    const { sortBy, sortOrder } = queryParams;

    if (sortBy) {
      return { sortBy, sortOrder };
    }
    return { sortOrder: "desc", sortBy: "" }; // Default sort
  }

  // Pagination builder
  buildPagination(queryParams: T): {
    page: number;
    pageSize: number;
  } {
    const page = Math.max(1, queryParams.page || 1);
    const pageSize = Math.min(
      Math.max(1, queryParams.pageSize ?? 10),
      30 // Maximum limit
    );

    return { page, pageSize };
  }

  // Search method with optional implementation
  buildSearch(queryParams: T): string {
    const { search } = queryParams;

    if (!search) return "";

    return search;
  }

  // Comprehensive query method
  buildQuery(queryParams: T): {
    search: string;
    page: number;
    pageSize: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filter: Partial<T>;
  } {
    return {
      search: this.buildSearch(queryParams),
      ...this.buildPagination(queryParams),
      ...this.buildSort(queryParams),
      filter: this.buildFilter(queryParams),
    };
  }

  // Helper method to apply filtering
  applyFilter(data: T[], queryParams: T): T[] {
    const filter = this.buildFilter(queryParams);

    return data.filter((item) =>
      Object.entries(filter).every(
        ([key, value]) => item[key as keyof T] === value
      )
    );
  }

  // Helper method to apply sorting
  applySorting(data: T[], queryParams: T): T[] {
    const sort = this.buildSort(queryParams);
    const sortBy = sort.sortBy;
    const sortOrder = sort.sortOrder;

    if (!sortBy) return data;

    return [...data].sort((a, b) => {
      const valA = a[sortBy as keyof T];
      const valB = b[sortBy as keyof T];

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return sortOrder === "asc"
        ? Number(valA) - Number(valB)
        : Number(valB) - Number(valA);
    });
  }
}
