import { TOrderStatus } from "@/types/status";

export interface IOrder {
  id: string;
  invoiceId: string;
  productName: string;
  price: number;
  img_url: string;
  orderNumber: number;
  orderDate: string | Date;
  status: TOrderStatus;
  sizes?: string;
  quantity?: number;
  colors?: string;
}
