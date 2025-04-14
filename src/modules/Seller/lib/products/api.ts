import { axiosWithAuth } from "@/lib/client";
import { QueryResult } from "@/models/query-result";
import {
  ISellerProduct,
  ISellerProductQueryParams,
  ProductDto,
} from "@/modules/Seller/models/product";
import SellerProductRespository from "@/modules/Seller/respository/seller-product-repository";

class SellerProductApiAdapter implements SellerProductRespository {
  async getProduct() {}
  async getProductList(
    queryParams: ISellerProductQueryParams
  ): Promise<QueryResult<ISellerProduct>> {
    const searchParams = new URLSearchParams();

    // Add all defined query parameters
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const response = await axiosWithAuth.get(
      `/seller/products?${searchParams.toString()}`
    );
    return {
      totalPages: response.data.pagination.totalPages,
      ...response.data,
    };
  }
  async createProduct(productData: FormData) {
    console.log(productData,'ds')
    const response = await axiosWithAuth.post("/create-product", productData);
    return response.data;
  }
}
export default new SellerProductApiAdapter();
