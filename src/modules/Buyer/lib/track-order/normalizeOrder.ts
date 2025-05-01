import { Order } from "@/types/orders";
import { formatDate } from "@/lib/utils";

export const normalizeOrder = (order: any): Order => {
 
  const rawDate = order.created_at ? new Date(order.created_at) : new Date();

  return {
    ...order,
    created_at: rawDate.toString(), // Actual Date object for sorting
    orderId: order._id || "", 
    orderNo: order.orderNumber || "", 
    invoiceID: order.invoiceID || "", 
    formattedDate: formatDate(rawDate), // Formatted Date for UI (using the utility function)
    order_status: order.order_status || "pending", 
    buyer: {
      buyerId: order.buyer?._id || "", 
      fullName: order.buyer?.fullName || "Unknown Buyer", 
    },
    seller: {
      sellerId: order.sneaker?.seller?.user_id?._id || "", 
      fullName: order.sneaker?.seller?.user_id?.fullName || "Unknown Seller", 
      time: order.sneaker?.seller?.time || "", 
    },
    address: order.address || "No Address Provided", 
    product: {
      productId: order.sneaker?._id || "", 
      brand: order.sneaker?.brand || "Unknown Brand", 
      model: order.sneaker?.model || "Unknown Model", 
      description: order.sneaker?.description || "No Description",
      quantity: order.sneaker?.quantity ? Number(order.sneaker.quantity) : 1, 
      price: order.sneaker?.price ? Number(order.sneaker.price) : 0, 
    },
    size: order.size || "N/A", 
    color: order.color || "N/A", 
    verificationStatus: order.order_status || "N/A", 
  };
};
