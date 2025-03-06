import { BaseQueryBuilder } from "../../../../lib/query-base-builder";
import { ISellerOrderQueryParams } from "../../models/orders";

class SellerOrdersQueryBuilder extends BaseQueryBuilder<ISellerOrderQueryParams> {
  buildFilter(
    queryParams: ISellerOrderQueryParams
  ): Partial<ISellerOrderQueryParams> {
    const filter: Partial<ISellerOrderQueryParams> = {};

    if (queryParams.status) {
      filter.status = queryParams.status;
    }
    return filter;
  }
}

export const SellerOrderQueryBuilder = new SellerOrdersQueryBuilder();
export type SellerOrderQueryBuilderType = typeof SellerOrderQueryBuilder;
