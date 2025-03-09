import { QueryResult } from "../../../../models/query-result";
import { ISellerProductQueryParams } from "../../models/product";
import SellerProductApi from "./api";
import { transformSellerProduct } from "./transformers";
async function getProductList(queryParams: ISellerProductQueryParams) {
  const response = await SellerProductApi.getProductList(queryParams);
  return {
    data: transformSellerProduct(response),
    totalPages: response.totalPages,
  };
}

export default { getProductList };
