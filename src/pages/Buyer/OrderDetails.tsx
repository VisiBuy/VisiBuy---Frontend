import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { HiArrowLeft } from "react-icons/hi";
import VerifyButton from "../../modules/Buyer/features/track-order/components/VerifyButton";
import VisualVerificationModal from "../../modules/Buyer/features/track-order/components/VisualVerificationModal";
import FeedbackModal from "../../modules/Buyer/features/track-order/components/FeedbackModal";
<<<<<<< HEAD
import { getOrderHistory } from "@/modules/Buyer/models/track-order/trackOrderSlice";
=======
import { getOrderHistory } from "@/modules/Buyer/models/trackOrderSlice";
>>>>>>> staging
import { verifyOrder } from "@/modules/Buyer/lib/track-order/api";
import { Order } from "@/types/orders";
import { normalizeOrder } from "@/modules/Buyer/lib/track-order/normalizeOrder";
import { statusToClassName } from "@/modules/Buyer/lib/track-order/utils";
import { TOrderStatus } from "@/types/status";

const BuyerOrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const safeOrderId = orderId ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("auth-token") || "";

<<<<<<< HEAD
  const { orders, loading, error, pagination } = useSelector(
=======
  const { orders, allOrders, loading, error, pagination } = useSelector(
>>>>>>> staging
    (state: any) => state.trackOrder
  );

  useEffect(() => {
<<<<<<< HEAD
    if (!orders.length || !orders.find((order: any) => order._id === orderId)) {
=======
    if (
      !allOrders.find(
        (order: any) => order._id === orderId || order.orderId === orderId
      )
    ) {
>>>>>>> staging
      dispatch(getOrderHistory(pagination.currentPage));
    }
  }, [dispatch, orders.length, orderId, pagination.currentPage]);

  const orderDetails: Order | null = useMemo(() => {
    if (loading || !orders.length) return null;
<<<<<<< HEAD
    const foundOrder = orders.find((order: any) => order._id === orderId);
=======
    const foundOrder = allOrders.find(
      (order: any) => order._id === orderId || order.orderId === orderId
    );
>>>>>>> staging
    return foundOrder ? normalizeOrder(foundOrder) : null;
  }, [orders, orderId, loading]);

  const [isVerifying, setIsVerifying] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleVerifyClick = () => {
    if (!orderId) {
      console.error("🚨 Order ID is missing!");
      return;
    }
    setShowVerificationModal(true);
  };

  const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    return deliveryDate.toLocaleDateString();
  };

<<<<<<< HEAD
  // ✅ Function to get dynamic verification status
  const getVerificationStatus = () => {
    if (!orderDetails) return "Loading...";
    if (orderDetails.order_status === "pending") {
      return "Awaiting Verification";
    }
    // You can add more mappings if necessary
    switch (orderDetails.order_status) {
      case "accepted":
        return "Accepted";
      case "cancelled":
        return "Cancelled";
      default:
        return orderDetails.order_status; // fallback to showing the raw status if no mapping
    }
  };
=======
  

>>>>>>> staging


  return (
    <div className="relative p-4 md:p-4">
      <div className="flex items-center justify-between mb-6 rounded-md max-w-6xl">
        <div className="flex items-center gap-3">
          <HiArrowLeft
            className="w-7 h-7 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl md:text-2xl font-bold">
            Order #{orderDetails?.orderNo || " "}
          </h1>
        </div>
        <span
          className={`px-2 py-1 rounded-md text-sm font-semibold font-Montserrat 
    ${
      orderDetails?.order_status === "pending"
        ? "bg-blue text-white"
        : statusToClassName(orderDetails?.order_status as TOrderStatus)
    }
  `}
        >
          {orderDetails?.order_status === "pending"
            ? "Awaiting Verification"
            : orderDetails?.order_status
                ?.split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
        </span>
      </div>

<<<<<<< HEAD
      {loading && <p>Loading...</p>}
=======
      {loading && <p></p>}
>>>>>>> staging
      {error && <p className="text-red-500">{error}</p>}

      {!loading && orderDetails ? (
        <div className="lg:flex lg:justify-between gap-8">
          <div className="flex-1 bg-white p-4 space-y-4">
            {/* Order Details */}
            <div className="p-4">
              <div className="grid grid-cols-2 text-xs md:text-xl font-medium font-OpenSans">
                <div className="space-y-2 text-light-gray-600">
                  <p>Buyer</p>
                  <p>Seller</p>
                  <p>Date & Time of Purchase</p>
                  <p>Invoice ID</p>
                </div>
                <div className="space-y-2 text-right">
                  <p>{orderDetails?.buyer?.fullName.toUpperCase()}</p>
                  <p>{orderDetails?.seller?.fullName.toUpperCase()}</p>
                  <p>{orderDetails?.formattedDate}</p>
                  <p>{orderDetails?.invoiceID}</p>
                </div>
              </div>
            </div>

            {/* Product */}
            <div className="p-4">
              <div className="flex justify-between text-lg font-OpenSans text-black p-2 mt-10 border-t border-gray-300">
                <p className="font-medium">
                  {orderDetails?.product?.quantity || 0}{" "}
                  {orderDetails?.product?.model || "N/A"}
                </p>
                <p className="font-bold">
                  {" "}
                  &#8358; {orderDetails?.product?.price || 0}
                </p>
              </div>
            </div>

            {/* Verify Button */}
            <div className="p-4 flex items-center justify-between">
              <span className="text-light-gray-600 font-medium">
                Verify your Order
              </span>
              <VerifyButton
                isVerifying={isVerifying}
                isVerified={orderDetails?.order_status === "accepted"}
                isCancelled={orderDetails?.order_status === "cancelled"}
                onClick={handleVerifyClick}
                isButtonVerified={orderDetails?.order_status === "accepted"}
              />
            </div>

            {/* Delivery Date */}
            {orderDetails.order_status === "accepted" && (
              <div className="p-4 space-y-2 border-t border-gray-300">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="font-semibold text-black">
                    Delivery Date:
                  </span>
                  <span className="text-gray-500">{getDeliveryDate()}</span>
                </div>
              </div>
            )}

            {/* Customer Care */}
            <div className="p-4 space-y-2">
              <div className="flex items-center font-OpenSans font-medium justify-between text-sm">
                <span>
                  Experiencing issues with this order? Reach out to our
                </span>
                <button className="text-blue hover:underline">
                  Customer Care
                </button>
              </div>
            </div>
          </div>

          {/* Optional Side Content */}
          <div className="w-[250px]"></div>
        </div>
      ) : (
        !loading && (
          <div className="text-center text-gray-500">
            <p>Order details not found.</p>
            <button
              onClick={() =>
                dispatch(getOrderHistory(pagination.currentPage))
              }
              className="mt-2 text-blue-600 font-semibold hover:underline"
            >
              Retry
            </button>
          </div>
        )
      )}

      {/* Verification Modal */}
      <VisualVerificationModal
        isOpen={showVerificationModal}
        orderId={safeOrderId}
        productName={orderDetails?.product?.model}
        colors={
          Array.isArray(orderDetails?.color)
            ? orderDetails.color
            : orderDetails?.color
              ? [orderDetails.color]
              : []
        }
        sizes={
          Array.isArray(orderDetails?.size)
            ? orderDetails.size
            : orderDetails?.size
              ? [orderDetails.size]
              : []
        }
        onClose={() => setShowVerificationModal(false)}
        onYes={async () => {
          setShowVerificationModal(false);
          setIsVerifying(true);
          try {
            await verifyOrder(safeOrderId, "accepted");
            dispatch(getOrderHistory(pagination.currentPage));
            setShowFeedbackModal(true);
          } catch (err) {
            console.error(err);
            alert("Verification failed. Please try again.");
          } finally {
            setIsVerifying(false);
          }
        }}
        onNo={() => {
          dispatch(getOrderHistory(pagination.currentPage));
          setShowVerificationModal(false);
        }}
      />

      {showFeedbackModal && (
        <FeedbackModal
          orderId={safeOrderId}
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
        />
      )}
    </div>
  );
};

export default BuyerOrderDetailsPage;
