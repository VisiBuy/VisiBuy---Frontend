import { axiosWithAuth } from "@/lib/client";
import { VerificationResponse, VerificationImage } from "@/types/VerificationImage";

/**
 * Track Order
 * GET /order/history
 */
export async function fetchOrderHistory(page = 1) {
  try {
    const response = await axiosWithAuth.get(`/order/history?page=${page}`); 
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
  status: "accepted" | "canceled"
) {
  try {
    console.log("🔍 Sending verification request with:", {
      order_id: orderId,
      status,
    });

    const response = await axiosWithAuth.post("/verify", {
      order_id: orderId,
      status,
    });

    console.log("✅ Verification response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error verifying order:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Failed to verify order");
  }
}


/**
 * Get Verification Images
 * GET /image?order_id=...
 */
export async function fetchVerificationImages(
  orderId: string
): Promise<VerificationResponse> {
  if (!orderId || typeof orderId !== "string") {
    console.error("Invalid Order ID:", orderId);
    throw new Error("Invalid Order ID");
  }

  try {
    const response = await axiosWithAuth.get("/image", {
      headers: { order_id: orderId },
    });

    const data = response.data;

    // Transform raw response to match your component's expected structure
    const images: VerificationImage[] = (data.urls.urls || []).map(
      (img: any) => ({
        imageUrl: img.viewUrl,
        sneakerName: "", // if not available in backend
        size: "", // if not available in backend
        color: "", // if not available in backend
        verifiedDate: "", // if not available in backend
      })
    );

    return {
      productName: data?.urls?.productName || "Product",
      images,
      verificationId: data?.urls?._id || "N/A",
    };
  } catch (error: any) {
    console.error(
      "❌ Error fetching verification images:",
      error.response?.data || error
    );

    if (error.response?.status === 404) {
      return {
        productName: "Not Found",
        images: [],
        verificationId: "N/A",
      };
    }

    throw new Error(
      error.response?.data?.message || "Failed to fetch verification images"
    );
  }
}



/**
 * Submit Feedback
 * POST /feedback
 */
export const submitFeedback = async (
  orderId: string,
  rating: number,
  comments?: string
) => {
  try {
    console.log("📤 Sending Request:", { order_id: orderId, rating, comments });
    const response = await axiosWithAuth.post("/feedback", {
      order_id: orderId,
      rating,
      comments: comments || "",
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw error;
  }
};


/**
 * Get Notifications
 * GET /notification
 */
export async function fetchNotifications() {
  try {
    const response = await axiosWithAuth.get("/notification"); // Fetch notifications
    return response.data.notifications; // Return only the notifications data
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
}



