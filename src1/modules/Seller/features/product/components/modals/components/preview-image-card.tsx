import { cn } from "../../../../../../../lib/utils";
import { ImageUploadSchema } from "../../../../../models/product";
import { cva } from "class-variance-authority";
import { useCallback, useMemo, useState } from "react";
const dummy_value = [1, 2, 3, 4];
export function PreviewImagesCard({
  images,
}: Readonly<{ images: ImageUploadSchema[] }>) {
  const [mainImage, setMainImage] = useState<ImageUploadSchema>({
    id: "1",
    type: "",
    size: 0,
    name: "",
    url: "/sneaker.png",
  });

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
    [mainImage]
  );
  return (
    <div
      className='flex justify-end  bg-light-gray rounded-lg'
      style={{
        backgroundImage: `url(${mainImage.url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className=' flex flex-col gap-4 p-4 mb-28 '
        style={{ background: " rgba(0, 0, 0, 0.1)" }}
      >
        {dummy_value.map((value, index) => (
          <div
            key={`image-${index}`}
            onClick={() => updateMainImage(index)}
            className={cn(
              "bg-light-gray-600 rounded-lg w-20 h-20 border-2  bg-contain ",
              mainImage.url === (images?.[index]?.url ?? "")
                ? "border-white"
                : "border-none"
            )}
            style={{
              backgroundImage: `url(${images?.[index] && images[index].url})`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
