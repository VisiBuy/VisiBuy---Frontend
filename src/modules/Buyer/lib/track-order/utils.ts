
import { TOrderStatus } from "@/types/status";


export function statusToClassName(status: TOrderStatus): string {
  switch (status) {
    case "pending":
      return "text-blue";
    case "accepted":
      return "text-yellow-700";
    case "dispatched":
      return "text-gray-700";
    case "delivered":
      return "text-green-700";
    case "cancelled":
      return "text-red-700";
    default:
      return "text-orange-600";
  }
}
