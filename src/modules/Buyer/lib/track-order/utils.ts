import { TOrderStatus } from "../../../../types/status"; 

export function statusToClassName(status: TOrderStatus): string {
  switch (status) {
    case "pending":
      return "text-blue";
    case "accepted":
      return "text-yellow-600";
    case "dispatched":
      return "text-red-600";
    case "delivered":
      return "text-green-600";
    case "cancelled":
      return "text-gray-600";
    default:
      return "text-blue-200";
  }
}
