import { CheckCircle, XCircle } from "lucide-react";

interface VerifyButtonProps {
  isVerifying: boolean; // Controls spinner
  isVerified: boolean; // If true, shows "Verified" state
  isCancelled: boolean; //if false, shows "cancelled" state
  isButtonVerified: boolean;
  onClick: () => void; // Called when button is clicked
}

const VerifyButton: React.FC<VerifyButtonProps> = ({
  isVerifying,
  isVerified,
  isCancelled,
  isButtonVerified,
  onClick,
}) => {
  let content;

  if (isVerifying) {
    content = (
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    );
  } else if (isVerified || isButtonVerified) {
    content = (
      <>
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span>Verified</span>
      </>
    );
  } else if (isCancelled) {
    content = (
      <>
        <XCircle className="w-5 h-5 text-red-500" />
        <span>Cancelled</span>
      </>
    );
  } else {
    content = "Verify Order";
  }

  return (
    <button
      onClick={onClick}
      disabled={isVerifying || isVerified || isCancelled || isButtonVerified}
      className={`px-4 py-2 rounded-md font-Montserrat font-semibold flex items-center gap-2 
        ${
          isVerified || isButtonVerified
            ? "bg-blue text-white"
            : isCancelled
              ? "bg-red-600 text-white"
              : "bg-blue text-white hover:bg-blue-700"
        }
      `}
    >
      {content}
    </button>
  );
};

export default VerifyButton;
