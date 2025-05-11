import { useState } from "react";
import clsx from "clsx";
import { MoveDiagonal } from "lucide-react";

interface ImageGalleryProps {
  images: { imageUrl: string }[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  isMobile: boolean;
  setLightboxIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsLightboxOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  activeIndex,
  setActiveIndex,
  isMobile,
  setLightboxIndex,
  setIsLightboxOpen,
}) => (
  <div>
    <div className="w-full flex justify-center mb-4">
      <img
        src={images[activeIndex]?.imageUrl}
        alt="Verification Image"
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
  </div>
);

export default ImageGallery;
