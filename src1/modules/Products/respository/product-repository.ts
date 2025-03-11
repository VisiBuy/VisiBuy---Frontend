import { QueryResult } from "../../../models/query-result";
import { IProduct, ProductQueryParams } from "../models/types";

interface ProductRespository {
  getProduct: () => void;
  getProductList: (
    queryParams: ProductQueryParams
  ) => Promise<QueryResult<IProduct[]>>;
}

export default ProductRespository;
