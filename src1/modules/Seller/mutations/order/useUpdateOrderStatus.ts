import { useMutation, useQueryClient } from "@tanstack/react-query";
import SellerOrderService from "../../lib/orders/services";
import { TUpdateSellerOrderStaus } from "../../models/orders";
import { getOrdersQueryKey } from "../../queries/order/queries";
export function useUpdateSellerOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TUpdateSellerOrderStaus) =>
      SellerOrderService.updateSellerOrderStatus(payload),
    onSuccess: (data) =>
      queryClient.invalidateQueries({ queryKey: getOrdersQueryKey() }),
  });
}
