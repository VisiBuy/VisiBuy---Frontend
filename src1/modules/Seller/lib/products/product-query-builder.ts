import { BaseQueryBuilder } from "../../../../lib/query-base-builder";
import { ISellerProductQueryParams } from "../../models/product";

class SellerProductsQueryBuilder extends BaseQueryBuilder<ISellerProductQueryParams> {
  buildFilter(
    queryParams: ISellerProductQueryParams
  ): Partial<ISellerProductQueryParams> {
    const filter: Partial<ISellerProductQueryParams> = {};

    if (queryParams.brand) {
      filter.brand = queryParams.brand;
    }
    if (queryParams.color) {
      filter.color = queryParams.color;
    }
    if (queryParams.price_range) {
      filter.price_range = queryParams.price_range;
    }
    if (queryParams.stock_status) {
      filter.stock_status = queryParams.stock_status;
    }
    return filter;
  }
}

export const SellerProductQueryBuilder = new SellerProductsQueryBuilder();
export type SellerProductQueryBuilderType = typeof SellerProductQueryBuilder;
