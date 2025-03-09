import { QueryResult } from "../../../models/query-result";
import { IProduct, ProductQueryParams } from "../models/types";
import ProductRespository from "../respository/product-repository";

class ProductApiAdapter implements ProductRespository {
  async getProduct() {}
  async getProductList(
    queryParams: ProductQueryParams
  ): Promise<QueryResult<IProduct[]>> {}
}
export default new ProductApiAdapter();
