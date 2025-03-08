import { TOrderStatus } from "@/types/status";

export interface Order {
  orderId: string;
  invoiceID: string;
  created_at: string;
  order_status: TOrderStatus; // Renamed from 'status' to 'order_status'
  buyer: {
    fullName: string;
  };
  seller: {
    name: string;
  };
  // Convert from product object to sneaker object
sneaker: {
    brand: string;
    model: string;
    price: string;
  };
  Size: string;
  Color: string;
}

