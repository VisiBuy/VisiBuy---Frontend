import { axiosWithAuth } from "@/lib/client";

/**
 * Track Order
 * GET /order/history
 */
export async function fetchOrderHistory() {
  try {
    const response = await axiosWithAuth.get("/order/history");
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw new Error("Failed to fetch order history");
  }
}

/**
 * Get Order Status
 * GET /order/:order_id/status
 */
export async function fetchOrderStatus(orderId: string) {
  try {
    const response = await axiosWithAuth.get(`/order/${orderId}/status`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw new Error("Failed to fetch order status");
  }
}

/**
 * Verify Order
 * POST /verify
 */
export async function verifyOrder(
  orderId: string,
  status: "verified" | "canceled"
) {
  try {
    const response = await axiosWithAuth.post("/verify", {
      order_id: orderId,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying order:", error);
    throw new Error("Failed to verify order");
  }
}

/**
 * Get Verification Images
 * GET /image?order_id=...
 */
export async function fetchVerificationImages(orderId: string) {
  try {
    const response = await axiosWithAuth.get(`/image`, {
      params: { order_id: orderId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching verification images:", error);
    throw new Error("Failed to fetch verification images");
  }
}

/**
 * Submit Feedback
 * POST /feedback
 */
export async function submitFeedback(
  orderId: string,
  rating: number,
  comments?: string
) {
  try {
    const response = await axiosWithAuth.post("/feedback", {
      order_id: orderId,
      rating,
      comments,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw new Error("Failed to submit feedback");
  }
}

