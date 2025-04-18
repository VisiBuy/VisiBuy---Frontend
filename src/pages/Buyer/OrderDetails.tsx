import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { HiArrowLeft } from "react-icons/hi";
// import ViewAll from "../../modules/Buyer/features/track-order/components/ViewAll";
import VerifyButton from "../../modules/Buyer/features/track-order/components/VerifyButton";
import VisualVerificationModal from "../../modules/Buyer/features/track-order/components/VisualVerificationModal";
import FeedbackModal from "../../modules/Buyer/features/track-order/components/FeedbackModal";
import { getOrderHistory } from "@/modules/Buyer/models/track-order/trackOrderSlice";
import { verifyOrder } from "@/modules/Buyer/lib/track-order/api";
import { Order } from "@/types/orders";
import { normalizeOrder } from "@/modules/Buyer/lib/track-order/normalizeOrder";

const BuyerOrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const safeOrderId = orderId ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("auth-token") || "";

  const { orders, loading, error, pagination } = useSelector(
    (state: any) => state.trackOrder
  );

  useEffect(() => {
    if (!orders.length || !orders.find((order: any) => order._id === orderId)) {
      dispatch(getOrderHistory({ page: pagination.currentPage }));
    }
  }, [dispatch, orders.length, orderId]);

  const orderDetails: Order | null = useMemo(() => {
    if (loading || !orders.length) return null;
    const foundOrder = orders.find((order: any) => order._id === orderId);
    return foundOrder ? normalizeOrder(foundOrder) : null;
  }, [orders, orderId, loading]);
  

  // const colors = orderDetails?.color || [];
  // const sizes = orderDetails?.size || [];

  const [verificationStatus, setVerificationStatus] = useState<
    "awaiting" | "verified"
  >("awaiting");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isButtonVerified, setIsButtonVerified] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    return deliveryDate.toLocaleDateString();
  };

  // 🛠 Fix: Show verification modal first before verifying
  const handleVerifyClick = () => {
    if (!orderId) {
      console.error("🚨 Order ID is missing!");
      return;
    }
    setShowVerificationModal(true); // Open modal first
  };

  return (
    <div className="relative p-4 md:p-4">
      <div className="flex items-center justify-between mb-6 rounded-md max-w-6xl">
        <div className="flex items-center gap-3">
          <HiArrowLeft
            className="w-7 h-7  cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl md:text-2xl font-bold">
            Order #{orderDetails?.orderNo || " "}
          </h1>
        </div>
        <span
          className={`px-2 py-1 rounded-md text-sm font-semibold font-Montserrat
          ${verificationStatus === "verified" ? "bg-blue-100 text-blue-700" : "bg-blue text-white"}`}
        >
          {verificationStatus === "verified"
            ? "Verified"
            : "Awaiting Verification"}
        </span>
      </div>

      {loading && <p></p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && orderDetails ? (
        <div className="lg:flex lg:justify-between gap-8">
          <div className="flex-1 bg-white p-4 space-y-4">
            <div className="p-4">
              <div className="grid grid-cols-2 text-xs md:text-xl font-medium font-OpenSans">
                <div className="space-y-2  text-light-gray-600">
                  <p>Buyer</p>
                  <p>Seller</p>
                  <p>Date & Time of Purchase</p>
                  <p>Invoice ID</p>
                </div>
                <div className="space-y-2 text-right">
                  <p>{orderDetails?.buyer?.fullName.toLocaleUpperCase()}</p>
                  <p>{orderDetails?.seller?.fullName.toLocaleUpperCase()}</p>
                  <p>{orderDetails?.created_at}</p>
                  <p>{orderDetails?.invoiceID}</p>
                </div>
              </div>
            </div>

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

            <div className="p-4 flex items-center justify-between">
              <span className="text-light-gray-600 font-medium">
                Verify your Order
              </span>
              <VerifyButton
                isVerifying={isVerifying}
                isVerified={isButtonVerified}
                onClick={handleVerifyClick}
              />
            </div>

            {verificationStatus === "verified" && (
              <div className="p-4 space-y-2 border-t border-gray-300">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="font-semibold text-black">
                    Delivery Date:
                  </span>
                  <span className="text-gray-500">{getDeliveryDate()}</span>
                </div>
              </div>
            )}

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

          <div className="w-[250px]">
            {/* <ViewAll onClick={() => alert("Clicked View all!")} /> */}
          </div>
        </div>
      ) : (
        !loading && (
          <div className="text-center text-gray-500">
            <p>Order details not found.</p>
            <button
              onClick={() =>
                dispatch(getOrderHistory({ page: pagination.currentPage }))
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
            setVerificationStatus("verified");
            setIsButtonVerified(true);
            setShowFeedbackModal(true);
          } catch (err) {
            console.error(err);
            alert("Verification failed. Please try again.");
          } finally {
            setIsVerifying(false);
          }
        }}
        onNo={() => setShowVerificationModal(false)}
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
