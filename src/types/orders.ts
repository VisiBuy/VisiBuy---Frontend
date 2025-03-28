import { TOrderStatus } from "@/types/status";

export interface Order {
  orderId: string; 
  orderNo: string;
  invoiceID: string;
  created_at: string;
  order_status: TOrderStatus;
  buyer: {
    buyerId: string; 
    fullName: string;
  };
  seller: {
    sellerId: string; 
    fullName: string;
    time?: string;
  };
  address: string;
  product: {
    productId: string;
    brand: string;
    model: string;
    description: string;
    quantity?: number;
    price: number;
  };
  size: string;
  color: string;
}
