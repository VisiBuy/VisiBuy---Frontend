import { useQuery } from "@tanstack/react-query";
import SellerNotificationService from "../../lib/notification/services";
export function getSellerNotificationQuery() {
  return ["notification"];
}
export function useGetSellerGetNotification() {
  return useQuery({
    queryKey: getSellerNotificationQuery(),
    queryFn: () => SellerNotificationService.getSellerNotificationList(),
  });
}
