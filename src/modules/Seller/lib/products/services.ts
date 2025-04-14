import { QueryResult } from "@/models/query-result";
import { ISellerProductQueryParams, ProductDto } from "../../models/product";
import SellerProductApi from "./api";
import { transformSellerProduct } from "./transformers";
async function getProductList(queryParams: ISellerProductQueryParams) {
  const response = await SellerProductApi.getProductList(queryParams);
  return {
    data: transformSellerProduct(response),
    totalPages: response.totalPages,
  };
}

async function createProduct(productData: FormData) {
  const response = await SellerProductApi.createProduct(productData);
  return response;
}

export default { getProductList, createProduct };
