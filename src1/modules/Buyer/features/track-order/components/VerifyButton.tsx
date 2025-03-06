import React from "react";
import { CheckCircle } from "lucide-react";

interface VerifyButtonProps {
  isVerifying: boolean; // Controls spinner
  isVerified: boolean; // If true, shows "Verified" state
  onClick: () => void; // Called when button is clicked
}

const VerifyButton: React.FC<VerifyButtonProps> = ({
  isVerifying,
  isVerified,
  onClick,
}) => {
  let content;
  if (isVerifying) {
    content = (
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    );
  } else if (isVerified) {
    content = (
      <>
        <CheckCircle className="w-5 h-5" />
        <span>Verified</span>
      </>
    );
  } else {
    content = "Verify Order";
  }

  return (
    <button
      onClick={onClick}
      disabled={isVerifying || isVerified}
      className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 flex items-center gap-2"
    >
      {content}
    </button>
  );
};

export default VerifyButton;
