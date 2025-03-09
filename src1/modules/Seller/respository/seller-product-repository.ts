import { QueryResult } from "../../../models/query-result";
import { ISellerProduct, ISellerProductQueryParams } from "../models/product";

interface SellerProductRespository {
  getProduct: () => void;
  getProductList: (
    queryParams: ISellerProductQueryParams
  ) => Promise<QueryResult<ISellerProduct>>;
}

export default SellerProductRespository;
