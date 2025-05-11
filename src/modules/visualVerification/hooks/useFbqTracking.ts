import { useEffect } from "react";

// Custom hook for Facebook Pixel tracking
export const useFbqTracking = (
  isOpen: boolean,
  verificationData: any, // Adjust type as necessary
  orderId: string
) => {
  useEffect(() => {
    if (isOpen && verificationData?.productId) {
      window.fbq?.("trackCustom", "VerificationOpened", {
        product_id: verificationData.productId,
        verified_seller: true,
      });
    }
  }, [isOpen, verificationData?.productId]);

  const handleApprove = () => {
    if (window.fbq) {
      window.fbq("trackCustom", "BuyerApprovedOrder", {
        order_id: orderId,
        product_id: verificationData?.productId || "unknown",
      });
    }
  };

  const handleReject = () => {
    if (window.fbq) {
      window.fbq("trackCustom", "BuyerRejectedOrder", {
        order_id: orderId,
        product_id: verificationData?.productId || "unknown",
      });
    }
  };

  return { handleApprove, handleReject };
};

export default useFbqTracking;
