import { TOrderStatus } from "../../../../types/status";
import { ISellerOrder } from "../../models/orders";
import { getSalesSummary } from "./utils";
import { formatDate } from "../../../../lib/utils";

export const transformSellerOrder = (
  data: any
): {
  total_orders: number;
  orders: ISellerOrder[];
  sellerOrderSummary: Record<TOrderStatus, number>;
} => {
  if (data.orders.length <= 0) {
    return {
      total_orders: data.total_orders,
      orders: data.orders,
      sellerOrderSummary: getSalesSummary([]),
    };
  }
  const transformedOrders = data?.orders.map((order: any) => {
    return {
      id: order._id,
      invoiceId: order.invoiceID,
      productName: order.sneaker.brand,
      price: order.sneaker.price,
      orderNumber: order.orderNumber,
      status: order.order_status,
      orderDate: order.created_at,
    };
  });

  return {
    total_orders: data.totalOrders,
    orders: transformedOrders,
    sellerOrderSummary: getSalesSummary(transformedOrders),
  };
};

export const transformASellerOrder = (
  data: any
): { order_status: TOrderStatus; order: Partial<ISellerOrder> } => {
  return {
    order_status: data.order_status,
    order: {
      productName: data.order_details.sneaker.brand,
      orderDate: data.order_details.created_at,
    },
  };
};
