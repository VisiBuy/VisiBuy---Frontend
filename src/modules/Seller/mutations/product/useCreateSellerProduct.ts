import { useMutation, useQueryClient } from "@tanstack/react-query";
import SellerProductService from "../../lib/products/services";
import { getProductsQueryKey } from "../../queries/product/queries";
import { ProductDto } from "../../models/product";
export function useCreateSellerProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FormData) => SellerProductService.createProduct(payload),
    onSuccess: (data) =>
      queryClient.invalidateQueries({ queryKey: getProductsQueryKey() }),
  });
}
