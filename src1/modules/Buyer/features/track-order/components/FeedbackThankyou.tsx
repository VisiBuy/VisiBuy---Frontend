import React from "react";

interface FeedbackThankYouProps {
  onDismiss: () => void;
}

const FeedbackThankYou: React.FC<FeedbackThankYouProps> = ({ onDismiss }) => {
  return (
    <div className="text-center space-y-4">
      <p className="text-2xl">Thank you for your feedback!</p>
      <button
        onClick={onDismiss}
        className="text-green-600 text-xl font-semibold hover:underline"
      >
        Dismiss
      </button>
    </div>
  );
};

export default FeedbackThankYou;
