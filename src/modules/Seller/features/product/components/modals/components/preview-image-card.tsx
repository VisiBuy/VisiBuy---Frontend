import { cn } from "@/lib/utils";
import { ImageUploadSchema } from "@/modules/Seller/models/product";
import { cva } from "class-variance-authority";
import { useCallback, useId, useMemo, useState } from "react";

const dummy_value = ["1", "2", "3", "4"];

export function PreviewImagesCard({
  images,
}: Readonly<{ images: ImageUploadSchema[] }>) {
  const id = useId();

  const [mainImage, setMainImage] = useState<ImageUploadSchema>(
    images[0] || {
      id: "1",
      type: "",
      size: 0,
      name: "",
      url: "",
    }
  );

  const updateMainImage = useCallback(
    (index: number) => {
      if (images[index]) {
        setMainImage(images[index]);
      } else {
        setMainImage({
          id: "1",
          type: "",
          size: 0,
          name: "",
          url: "",
        });
      }
    },
    [images] // Fix dependency array - remove mainImage and add images
  );

  return (
    <div
      className="flex justify-end bg-light-gray rounded-lg"
      style={{
        backgroundImage: `url(${mainImage.url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="flex flex-col gap-4 p-4 mb-28"
        style={{ background: "rgba(0, 0, 0, 0.1)" }}
      >
        {dummy_value.map((value, index) => {
          // Get current thumbnail URL with a fallback
          const thumbnailUrl = images[index]?.url || "";

          // Check if this thumbnail is the selected main image
          const isSelected =
            thumbnailUrl === "" && images[index]?.id === mainImage.id
              ? true
              : thumbnailUrl === mainImage.url && thumbnailUrl !== "";

          return (
            <div
              key={`image-${id}-${index}`} // Fix key with index
              onClick={() => updateMainImage(index)}
              className={cn(
                "bg-light-gray-600 rounded-lg w-20 h-20 border-2 bg-contain",
                isSelected ? "border-white" : "border-transparent" // Use transparent border for non-selected
              )}
              style={{
                backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : "none",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
