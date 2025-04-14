import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
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
  productName: string | undefined;
  onClose: () => void;
  onYes: () => void;
  onNo: () => void;
}

const VisualVerificationModal: React.FC<VisualVerificationModalProps> = ({
  isOpen,
  orderId,
  token,
  productName,
  onClose,
  onYes,
  onNo,
}) => {
  const [verificationData, setVerificationData] =
    useState<VerificationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && orderId) {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const tooltip = document.querySelector(".tooltip");
      if (tooltip && !tooltip.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const uniqueSizes = Array.from(
    new Set(verificationData?.images?.map((img) => img.size))
  );
  const uniqueColors = Array.from(
    new Set(verificationData?.images?.map((img) => img.color))
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white px-10 py-12 rounded-xl shadow-xl w-full max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <ChevronLeft
            className="text-black cursor-pointer w-7 h-7"
            onClick={onClose}
          />
          <h2 className="text-2xl tracking-wide font-semibold">
            Visual Verification
          </h2>
        </div>

        {/* Product Name + Tooltip */}
        <div className="relative">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {productName || "Unknown Product"}
            </h2>
            <button
              onClick={() => setShowTooltip(!showTooltip)}
              className={`transition-transform ${showTooltip ? "rotate-180" : ""}`}
              title="Toggle sizes and colors"
            >
              <ChevronDown className="w-5 h-5 text-gray-600 hover:text-black" />
            </button>
          </div>

          {showTooltip && (
            <div className="tooltip absolute z-10 mt-2 bg-white border rounded-md shadow-md p-4 space-y-4 w-64">
              <div>
                <p className="font-semibold text-sm text-gray-700 mb-1">
                  Sizes
                </p>
                <div className="flex flex-wrap gap-2">
                  {uniqueSizes.map((size, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-2 py-0.5 rounded-full text-xs"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-700 mb-1">
                  Colors
                </p>
                <div className="flex flex-wrap gap-2 items-center">
                  {uniqueColors.map((color, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading & Error */}
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Image Cards */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {verificationData?.images?.slice(0, 5).map((img, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-sm p-3 min-w-[150px] text-center space-y-2"
            >
              <img
                src={img.imageUrl}
                alt={img.sneakerName}
                className="w-28 h-28 object-cover rounded-md mx-auto"
              />
              <p className="text-sm font-semibold">{img.sneakerName}</p>
              <div className="flex justify-center gap-2 text-xs">
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                  {img.size}
                </span>
                <span className="bg-gray-100 px-2 py-0.5 rounded-full capitalize">
                  {img.color}
                </span>
              </div>
              <p className="text-xs text-gray-500">{img.verifiedDate}</p>
            </div>
          ))}
        </div>

        {/* Verification Prompt */}
        <p className="text-lg font-medium text-gray-700">
          Does this product match your order?
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-6 pt-2">
          <button
            onClick={onNo}
            className="border border-black text-gray-700 px-8 py-2 rounded-md hover:bg-gray-100"
          >
            No
          </button>
          <button
            onClick={onYes}
            className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 font-medium"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualVerificationModal;
