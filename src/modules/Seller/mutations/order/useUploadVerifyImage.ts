import { useMutation, useQueryClient } from "@tanstack/react-query";
import SellerOrderService from "../../lib/orders/services";

export function useUploadSellerVerifyImages() {
  return useMutation({
    mutationFn: ({orderId,imagesData}: {orderId:string,imagesData:FormData}) =>
      SellerOrderService.uploadSellerVerifcationImages(orderId,imagesData),
   
  });
}
