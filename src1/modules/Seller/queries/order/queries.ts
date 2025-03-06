import { useQuery } from "@tanstack/react-query";
import { ISellerOrderQueryParams } from "../../models/orders";
import SellerOrderService from "../../lib/orders/services";
export function getOrdersQueryKey(
  queryParams?: ISellerOrderQueryParams | string
) {
  if (!queryParams) return ["orders"];
  return ["orders", queryParams];
}
export function getOrderQueryKey(id: string) {
  return [id];
}
export function useGetASellerOrderQuery(id: string) {
  return useQuery({
    queryKey: getOrderQueryKey(id),
    queryFn: () => SellerOrderService.getOrderById(id),
  });
}
export function useGetSellerOrdersQuery(
  queryParams: ISellerOrderQueryParams,
  isMatchRoute: boolean
) {
  return useQuery({
    queryKey: getOrdersQueryKey(queryParams),
    queryFn: () => SellerOrderService.getOrderList(queryParams),
    placeholderData: (previousData) => previousData,
    enabled: isMatchRoute,
  });
}
