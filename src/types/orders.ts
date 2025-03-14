import { TOrderStatus } from "@/types/status";

export interface Order {
  orderId: string;
  invoiceID: string;
  created_at: string;
  order_status: TOrderStatus;
  buyer: {
    fullName: string;
  };
  seller: {
    name: string;
  };
  product: {
    brand: string;
    model: string;
    title: string;
    description: string;
    quantity: number;
    price: string;
  };
  Size: string;
  Color: string;
}

