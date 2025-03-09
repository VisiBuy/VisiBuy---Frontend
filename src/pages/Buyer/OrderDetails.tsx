import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import ViewAll from "../../modules/Buyer/features/track-order/components/ViewAll";
import VerifyButton from "../../modules/Buyer/features/track-order/components/VerifyButton";
import VisualVerificationModal from "../../modules/Buyer/features/track-order/components/VisualVerificationModal";
import FeedbackModal from "../../modules/Buyer/features/track-order/components/FeedbackModal";
import {
  fetchOrderStatus,
  verifyOrder,
} from "@/modules/Buyer/lib/track-order/api";

import { Order } from "@/types/orders";

const BuyerOrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token") || "";

  
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  // Verification states
  const [verificationStatus, setVerificationStatus] = useState<
    "awaiting" | "verified"
  >("awaiting");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isButtonVerified, setIsButtonVerified] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Fetch order status details dynamically from the API
  useEffect(() => {
    if (orderId) {
      fetchOrderStatus(orderId)
      fetchOrderStatus(orderId)
        .then((data) => {
          setOrderDetails(data);
        })
        .catch((err) => console.error(err));
    }
  }, [orderId, token]);

  // Compute a delivery date 3 days after verification (if verified)
  const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    return deliveryDate.toLocaleDateString();
  };

  const handleVerifyClick = async () => {
    if (!orderId) return;
    try {
      setIsVerifying(true);
      // Call the verifyOrder API; using "verified" status
      await verifyOrder(orderId, "verified");
      await verifyOrder(orderId, "verified");
      setVerificationStatus("verified");
      setIsButtonVerified(true);
      setShowFeedbackModal(true);
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerificationNo = () => {
    setShowVerificationModal(false);
  };

  const handleVerificationYes = () => {
    setShowVerificationModal(false);
    setVerificationStatus("verified");
    setIsButtonVerified(true);
    setShowFeedbackModal(true);
  };

  return (
    <div className="relative p-4 md:p-4">
      {/* Header: Back Button + Order ID + Verification Status */}
      <div className="flex items-center justify-between mb-6 rounded-md max-w-6xl">
        <div className="flex items-center gap-3">
          <HiArrowLeft
            className="w-5 h-5 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl md:text-2xl font-bold">
            Order #{orderId || "1452589"}
          </h1>
        </div>
        <span
          className="px-2 py-1 rounded-xl text-sm font-semibold"
          style={{
            backgroundColor:
              verificationStatus === "verified" ? "#E0F2FE" : "#0284ff",
            color: verificationStatus === "verified" ? "#0284C7" : "white",
          }}
        >
          {verificationStatus === "verified"
            ? "Verified"
            : "Awaiting Verification"}
        </span>
      </div>

      {/* Order Details & View All */}
      <div className="lg:flex lg:justify-between gap-8">
        {/* Left Column: Order Details */}
        <div className="flex-1 bg-white p-4 space-y-4">
          {/* Order Information */}
          <div className="p-4">
            {orderDetails ? (
              <div className="grid grid-cols-2 text-sm text-gray-600">
                <div className="space-y-2 font-semibold">
                  <p>Buyer:</p>
                  <p>Seller:</p>
                  <p>Date & Time of Purchase:</p>
                  <p>Invoice ID:</p>
                </div>
                <div className="space-y-2 text-right">
                  <p>{orderDetails.buyer.fullName}</p>
                  <p>{orderDetails.seller.name}</p>
                  <p>{orderDetails.created_at}</p>
                  <p>{orderDetails.invoiceID}</p>
                </div>
              </div>
            ) : (
              <p>Loading order details...</p>
            )}
          </div>

          {/* Items Section: Dynamic Product Details */}
          <div className="p-4">
            {orderDetails ? (
              <div className="flex justify-between text-sm font-semibold text-gray-700 p-2 border-t border-gray-300">
                <p>
                  {orderDetails.product.quantity}x {orderDetails.product.title}
                  {orderDetails.product.quantity}x {orderDetails.product.title}
                </p>
                <p>#{orderDetails.product.price}</p>
              </div>
            ) : null}
          </div>

          {/* Verify Order */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-gray-700 font-semibold">
              Verify your Order
            </span>
            <VerifyButton
              isVerifying={isVerifying}
              isVerified={isButtonVerified}
              onClick={handleVerifyClick}
            />
          </div>

          {/* Delivery Info: Display only if verification is accepted */}
          {verificationStatus === "verified" && (
            <div className="p-4 space-y-2 border-t border-gray-300">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-semibold text-black">Delivery Date:</span>
                <span className="text-gray-500">{getDeliveryDate()}</span>
              </div>
            </div>
          )}

          {/* Additional Actions: Assign Rider & Customer Care */}
          <div className="p-4 space-y-2">
            {/* Assign Rider */}
            <div className="flex justify-end">
              <button className="text-sm hover:underline">
                + Assign to new rider
              </button>
            </div>
            {/* Customer Care */}
            <div className="flex items-center justify-between text-sm">
              <span>Experiencing issues with this order? Reach out to our</span>
              <button className="text-blue-600 font-semibold hover:underline">
                Customer Care
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: View All Component */}
        <div className="w-[250px]">
          <ViewAll onClick={() => alert("Clicked View all!")} />
        </div>
      </div>

      {/* Modals */}
      <VisualVerificationModal
        isOpen={showVerificationModal}
        orderId={orderId || ""}
        token={token}
        onClose={handleVerificationNo}
        onYes={handleVerificationYes}
      />
      {showFeedbackModal && (
        <FeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
        />
      )}
    </div>
  );
};

export default BuyerOrderDetailsPage;
