import { ProductDto } from "@/modules/Seller/models/product";
import { PreviewImagesCard } from "./preview-image-card";
import { formatCurrency } from "@/lib/utils";
const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};
export const ProductPreview = ({
  productFormData,
}: {
  productFormData: any;
}) => {
  const { images, brand, model, size, color, price, description } =
    productFormData;
  const previewImages = images?.map(
    (value: { name: any; imageLink: any }, index: string) => {
      return {
        id: index + "",
        name: value.name || "",
        url: value.imageLink,
      };
    }
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="max-h-auto">
        <PreviewImagesCard images={previewImages ?? []} />
      </div>

      <div className="space-y-8 font-OpenSans">
        <h3 className="font-Montserrat text-xl md:text-2xl font-medium ">
          {model}
        </h3>
        <hr className="h-[1px] w-full bg-light-gray" />
        <p className="font-semibold text-xl md:text-2xl ">
          NGN {formatCurrency(price, false)}
        </p>
        <hr className="h-[1px] w-full bg-light-gray" />
        <p className="font-semibold text-lg md:text-xl ">Brand: {brand}</p>
        <hr className="h-[1px] w-full bg-light-gray" />
        <p className="font-semibold text-lg md:text-xl">
          Size: {size.join(",")}
        </p>
        <hr className="h-[1px] w-full bg-light-gray" />
        <p className="font-semibold text-lg md:text-xl">
          Color: {color.join(",")}
        </p>
        <hr className="h-[1px] w-full bg-light-gray" />
        <p className="font-semibold text-lg md:text-xl">
          Description: <br /> <br />
          <span className="pt-4 font-normal leading-8">{description}</span>
        </p>
      </div>
    </div>
  );
};
