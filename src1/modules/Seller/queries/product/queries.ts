import { useQuery } from "@tanstack/react-query";
import SellerProductService from "../../lib/products/services";
import { ISellerProductQueryParams } from "../../models/product";
export function getProductsQueryKey(queryParams: ISellerProductQueryParams) {
  return ["products", queryParams];
}
export function useGetProducts(queryParams: ISellerProductQueryParams) {
  return useQuery({
    queryKey: getProductsQueryKey(queryParams),
    queryFn: () => SellerProductService.getProductList(queryParams),
  });
}
