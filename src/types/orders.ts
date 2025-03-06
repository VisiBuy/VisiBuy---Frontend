import { TOrderStatus } from "@/types/status";

export interface Order {
  id: string;
  title: string;
  description: string;
  status: TOrderStatus;
  time: string;
}
