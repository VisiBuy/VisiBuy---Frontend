import React, { useState } from "react";
import VisualVerificationFeedback from "./VisualVerificationFeedback";
import FeedbackThankYou from "./FeedbackThankyou";
import { normalizeOrder } from "@/modules/Buyer/lib/track-order/normalizeOrder";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string; // ✅ Ensure `orderId` is received as a prop
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  orderId,
}) => {
  const [stage, setStage] = useState<"feedback" | "thankyou">("feedback");

  if (!isOpen) return null;

  const handleFeedbackSubmit = () => {
    setStage("thankyou");
  };

  const handleDismiss = () => {
    setStage("feedback");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-10 md:p-24 rounded-lg shadow-lg w-full max-w-4xl">
        {stage === "feedback" ? (
          <VisualVerificationFeedback
            orderId={orderId}
            onFeedbackSubmitted={handleFeedbackSubmit}
          />
        ) : (
          <FeedbackThankYou onDismiss={handleDismiss} />
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
