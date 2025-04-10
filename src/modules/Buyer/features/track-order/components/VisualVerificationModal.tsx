import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { fetchVerificationImages } from "@/modules/Buyer/lib/track-order/api";

interface VerificationImage {
  imageUrl: string;
  sneakerName: string;
  size: string;
  color: string;
  verifiedDate: string;
}

interface VerificationResponse {
  productName: string;
  images: VerificationImage[];
}

interface VisualVerificationModalProps {
  isOpen: boolean;
  orderId: string;
  token: string;
  onClose: () => void;
  onYes: () => void;
  onNo: () => void;
}

const VisualVerificationModal: React.FC<VisualVerificationModalProps> = ({
  isOpen,
  orderId,
  onClose,
  onYes,
  onNo,
}) => {
  const [verificationData, setVerificationData] =
    useState<VerificationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen && orderId) {
      console.log("Fetching images for order ID:", orderId); 
      setLoading(true);
      fetchVerificationImages(orderId)
        .then((data: VerificationResponse) => {
          setVerificationData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch verification images");
          setLoading(false);
        });
    }
  }, [isOpen, orderId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white px-24 py-28 rounded-md shadow-lg w-full max-w-7xl space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <ChevronLeft
            className="text-black cursor-pointer w-8 h-8"
            onClick={onClose}
          />
          <h2 className="text-2xl tracking-wide font-Montserrat font-bold">
            Visual Verification
          </h2>
        </div>

        {/* Dynamic Product Name Selector */}
        <select className="border border-gray-300 font-bold font-Montserrat text-base rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500">
          <option
            key={verificationData?.productName}
            value={verificationData?.productName || ""}
          >
            {verificationData?.productName || "Select Product"}
          </option>
        </select>

        {loading && <p className="text-base text-gray-600">Loading...</p>}
        {error && <p className="text-base text-red-600">{error}</p>}

        {/* Dynamic Product Images Row */}
        <div className="flex gap-2 overflow-x-auto">
          {verificationData?.images?.slice(0, 5).map((img, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={img.imageUrl}
                alt={img.sneakerName}
                className="w-24 h-24 object-cover rounded-md"
              />
              <p className="text-sm font-bold">{img.sneakerName}</p>
              <p className="text-xs">
                {img.size} / {img.color}
              </p>
              <p className="text-xs text-gray-500">{img.verifiedDate}</p>
            </div>
          ))}
        </div>

        {/* Verification Question */}
        <p className="text-xl font-Montserrat text-gray-600">
          Does this product match your order?
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={onNo} // Calls onNo when "No" is clicked
            className="border border-black text-gray-600 px-20 py-3 rounded-md hover:bg-gray-100"
          >
            No
          </button>
          <button
            onClick={onYes} // Calls onYes when "Yes" is clicked
            className="bg-green-600 text-white px-20 py-3 rounded-md font-semibold hover:bg-green-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualVerificationModal;
