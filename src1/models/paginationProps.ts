import { BaseQueryBuilder } from "../lib/query-base-builder";
import { BaseQueryParams, IBaseQueryBuilder } from "./base-query-params";

export type TPaginationProps<T> = {
  totalPages: number;
  queryParams: T;
  queryBuilder: IBaseQueryBuilder<T>;
  setQueryParam: (value: any) => void;
  isFetching: boolean;
};
