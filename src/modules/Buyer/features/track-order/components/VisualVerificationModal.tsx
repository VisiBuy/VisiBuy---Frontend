import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Lock,
  MoveDiagonal,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { fetchVerificationImages } from "@/modules/Buyer/lib/track-order/api";
import { VerificationResponse } from "@/types/VerificationImage";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import clsx from "clsx";

interface VisualVerificationModalProps {
  isOpen: boolean;
  orderId: string;
  productName?: string;
  colors?: string[];
  sizes?: string[];
  onClose: () => void;
  onYes: () => void;
  onNo: () => void;
}

const VisualVerificationModal: React.FC<VisualVerificationModalProps> = ({
  isOpen,
  orderId,
  productName,
  colors = [],
  sizes = [],
  onClose,
  onYes,
  onNo,
}) => {
  const [verificationData, setVerificationData] =
    useState<VerificationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth <= 768);
    updateMobile(); // initial
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && orderId) {
      setLoading(true);
      fetchVerificationImages(orderId)
        .then((data) => {
          setVerificationData(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch verification images");
          setLoading(false);
        });
    }
  }, [isOpen, orderId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  if (!isOpen) return null;
  const images = verificationData?.images || [];
  const sizesFromMetadata = Array.from(new Set(images.map((img) => img.size)));
  const colorsFromMetadata = Array.from(
    new Set(images.map((img) => img.color))
  );

  const sizesFromOrder =
    verificationData?.normalizedOrderDetails?.flatMap((d) =>
      d.sizes?.map((s) => s.label)
    ) || [];

  const colorsFromOrder =
    verificationData?.normalizedOrderDetails?.flatMap((d) =>
      d.colors?.map((c) => c.label)
    ) || [];

  const finalSizes =
    sizesFromOrder.length > 0
      ? Array.from(new Set(sizesFromOrder))
      : sizesFromMetadata;
  const finalColors =
    colorsFromOrder.length > 0
      ? Array.from(new Set(colorsFromOrder))
      : colorsFromMetadata;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
        <div
          className={`bg-white rounded-2xl shadow-lg ${
            isMobile
              ? "w-full h-full"
              : "w-[600px] max-h-screen overflow-y-auto"
          } p-6 relative`}
        >
          <div className="flex items-center gap-3 mb-4">
            <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={onClose} />
            <h2 className="text-xl font-bold font-Montserrat">
              Visual Verification
            </h2>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-lg font-OpenSans">
              {productName || "Unnamed Product"}
            </p>
            <button
              onClick={() => setShowTooltip(!showTooltip)}
              className="transition-transform"
            >
              <ChevronDown
                className={`w-5 h-5 ${showTooltip ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {showTooltip && (
            <div
              ref={tooltipRef}
              className="absolute top-20 right-6 bg-white shadow-md border rounded-md p-4 w-64 z-10"
            >
              <div className="mb-4">
                <p className="text-sm font-semibold mb-1">Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {finalSizes.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Colors</p>
                <div className="flex gap-2 items-center">
                  {finalColors.map((c, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: c }}
                      title={c}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {loading && <p className="text-gray-600"></p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <>
              <div className="w-full flex justify-center mb-4">
                <img
                  src={images[activeIndex]?.imageUrl}
                  alt="Sneaker"
                  className="w-64 h-64 object-cover rounded-xl border"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-4 relative">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img.imageUrl}
                      alt="Thumbnail"
                      className={clsx(
                        "object-cover rounded-lg border cursor-pointer",
                        isMobile ? "w-24 h-24" : "w-32 h-32",
                        activeIndex === index && "ring-2 ring-blue-500"
                      )}
                      onClick={() => setActiveIndex(index)}
                    />
                    <div
                      className="absolute top-1 right-1 bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => {
                        setLightboxIndex(index);
                        setIsLightboxOpen(true);
                      }}
                    >
                      <MoveDiagonal className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-2 text-sm text-gray-500 mb-6">
                <span className="inline-flex items-center gap-1">
                  <Lock className="w-4 h-4" /> Encrypted Storage
                </span>
                <span className="text-xs">
                  Verification ID: {verificationData?.verificationId || "N/A"}
                </span>
              </div>

              <p className="text-left text-xl md:text-2xl font-OpenSans font-medium mb-4">
                Does this product match your order?
              </p>

              <div className="flex justify-end gap-6">
                <button
                  onClick={onNo}
                  className="border border-black text-black font-OpenSans text-lg md:text-xl px-12 py-3 rounded-lg hover:bg-gray-100"
                >
                  No
                </button>
                <button
                  onClick={onYes}
                  className="bg-green-600 text-white text-lg md:text-xl px-12 py-3 font-OpenSans rounded-lg hover:bg-green-700"
                >
                  Yes
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          index={lightboxIndex}
          slides={images.map((img) => ({ src: img.imageUrl }))}
          plugins={[Fullscreen, Zoom, Thumbnails]}
          zoom={{ maxZoomPixelRatio: 4 }}
          render={{
            iconPrev: () => <ArrowLeft className="text-white w-6 h-6" />,
            iconNext: () => <ArrowRight className="text-white w-6 h-6" />,
            iconClose: () => <ChevronLeft className="text-white w-6 h-6" />,
          }}
        />
      )}
    </>
  );
};

export default VisualVerificationModal;
