import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import ViewAll from "../../modules/Buyer/features/track-order/components/ViewAll";
import VerifyButton from "../../modules/Buyer/features/track-order/components/VerifyButton";
import VisualVerificationModal from "../../modules/Buyer/features/track-order/components/VisualVerificationModal";
import FeedbackModal from "../../modules/Buyer/features/track-order/components/FeedbackModal";

const BuyerOrderDetailsPage: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // "Awaiting Verification" or "Verified"
  const [verificationStatus, setVerificationStatus] = useState<
    "awaiting" | "verified"
  >("awaiting");

  // VerifyButton states
  const [isVerifying, setIsVerifying] = useState(false);
  const [isButtonVerified, setIsButtonVerified] = useState(false);

  // Show modals
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Called when user clicks "Verify" button
  const handleVerifyClick = () => {
    // Start spinner
    setIsVerifying(true);
    // Simulate short loading
    setTimeout(() => {
      setIsVerifying(false);
      // Open visual verification modal
      setShowVerificationModal(true);
    }, 1000);
  };

  // VisualVerificationModal => user clicks "No"
  const handleVerificationNo = () => {
    setShowVerificationModal(false);
    // Keep status = awaiting
    // Keep verify button = not verified
  };

  // VisualVerificationModal => user clicks "Yes"
  const handleVerificationYes = () => {
    // Close modal
    setShowVerificationModal(false);
    // Set status to verified
    setVerificationStatus("verified");
    // Set button to verified
    setIsButtonVerified(true);
    // Open feedback modal
    setShowFeedbackModal(true);
  };

  return (
    <div className="relative p-4 md:p-8">
      {/* Top Row: arrow + order # on left, verification badge + view all on right */}
      <div className="flex items-center justify-between mb-6">
        {/* Left side: arrow + order # */}
        <div className="flex items-center gap-3">
          <HiArrowLeft
            className="w-6 h-6 text-blue-600 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl md:text-2xl font-bold">
            Order #{orderId || "1452589"}
          </h1>
        </div>
        <span
          className="px-3 py-1 rounded-md text-sm font-semibold"
          style={{
            backgroundColor:
              verificationStatus === "verified" ? "#E0F2FE" : "#DBEAFE",
            color: verificationStatus === "verified" ? "#0284C7" : "#2563EB",
          }}
        >
          {verificationStatus === "verified"
            ? "Verified"
            : "Awaiting Verification"}
        </span>

        {/* Right side: verification badge + view all */}
        <div className="flex items-center gap-4">
          <ViewAll onClick={() => alert("Clicked View all!")} />
        </div>
      </div>

      {/* 2-column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column */}
        <div className="flex-1 space-y-4">
          {/* Buyer & Seller Info */}
          <div className="bg-white shadow-sm p-4 rounded-md">
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Buyer:</span> Chinaza Emmanuel
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Seller:</span> Chukwudi Stores
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Date & Time of Purchase:</span>{" "}
              14:32, Jan 24, 2025
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Transaction ID:</span> B9g9h8j5bjg
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Session ID:</span> 8S9H3Spk9Hgh4hd
            </p>
          </div>

          {/* Items */}
          <div className="bg-white shadow-sm p-4 rounded-md">
            <h2 className="font-semibold text-gray-800 mb-2">Items</h2>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <p>1x Newest Versace Sneakers Collections (#39,952)</p>
              <p>#14,000</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <p>1x Newest Versace Sneakers Collections (#39,952)</p>
              <p>#14,000</p>
            </div>
          </div>

          {/* "Verify your Order" Row -> uses VerifyButton */}
          <div className="bg-white shadow-sm p-4 rounded-md flex items-center justify-between">
            <span className="text-gray-700 font-semibold">
              Verify your Order
            </span>
            <VerifyButton
              isVerifying={isVerifying}
              isVerified={isButtonVerified}
              onClick={handleVerifyClick}
            />
          </div>

          {/* Delivery Info / CTA */}
          <div className="bg-white shadow-sm p-4 rounded-md space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">50 mins left to delivery</span>{" "}
              (Estimated delivery Jan 7, 1:30 PM)
            </p>
            <button className="text-blue-600 text-sm hover:underline">
              + Assign to new rider
            </button>
            <p className="text-sm text-gray-600">
              Experiencing any issue with your order? Reach out to our{" "}
              <button className="text-blue-600 font-semibold hover:underline">
                Customer Care
              </button>
            </p>
          </div>
        </div>

        {/* Right column: placeholder white box */}
        <div className="w-full lg:w-64">
          <div className="bg-white shadow-sm p-4 rounded-md h-32" />
        </div>
      </div>

      {/* Visual Verification Modal */}
      <VisualVerificationModal
        isOpen={showVerificationModal}
        onClose={handleVerificationNo}
        onYes={handleVerificationYes}
      />

      {/* Feedback Modal */}
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
