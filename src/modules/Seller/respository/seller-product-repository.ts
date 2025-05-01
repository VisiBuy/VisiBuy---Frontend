import { QueryResult } from "@/models/query-result";
import {
  ISellerProduct,
  ISellerProductQueryParams,
  ProductDto,
} from "../models/product";

interface SellerProductRespository {
  getProduct: () => void;
  getProductList: (
    queryParams: ISellerProductQueryParams
  ) => Promise<QueryResult<ISellerProduct>>;
  createProduct: (productData: FormData) => Promise<any>;
}

export default SellerProductRespository;
