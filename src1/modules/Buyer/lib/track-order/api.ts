/**
 * Track Order
 * GET /order/history
 * Headers: auth-token: <token>
 */
export async function fetchOrderHistory(token: string) {
  const response = await fetch("/order/history", {
    method: "GET",
    headers: {
      "auth-token": token,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch order history");
  }
  return response.json();
}


// src/modules/buyer/lib/api.ts
export async function fetchOrderStatus(orderId: string) {
  const response = await fetch(`/${orderId}/status`);
  if (!response.ok) {
    throw new Error("Failed to fetch order status");
  }
  return response.json();
}

export async function verifyOrder(orderId: string) {
  const response = await fetch("/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId }),
  });
  if (!response.ok) {
    throw new Error("Failed to verify order");
  }
  return response.json();
}

export async function fetchVerificationImages(orderId: string) {
  const response = await fetch(`/image?order_id=${orderId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch verification images");
  }
  return response.json();
}

export async function submitFeedback(orderId: string, feedback: string) {
  const response = await fetch("/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, feedback }),
  });
  if (!response.ok) {
    throw new Error("Failed to submit feedback");
  }
  return response.json();
}

