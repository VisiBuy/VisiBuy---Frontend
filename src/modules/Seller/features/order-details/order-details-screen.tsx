import OrderSelectStatus from "@/common/components/status-selector";
import { currencyFormmater, formatDate, ImageLinkMap } from "@/lib/utils";
import { Button } from "@/ui/Button";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetASellerOrderQuery,
  useGetSellerVerificationImages,
} from "../../queries/order/queries";
import { useAppSelector } from "@/hooks/app-hooks";
import { OverlaySpinner } from "@/common/components/modal-spinner";
import ImagePickerFactory from "@/common/components/image-picker-factory";
import { useUploadSellerVerifyImages } from "../../mutations/order/useUploadVerifyImage";
import { useToast } from "@/ui/use-toast";
import { SUCCESS_RESPONSE_CREATE_RECORD } from "@/lib/systemConfig";
import { DisplayVerificationImage } from "./display-verification-images";
import { ModalWrapperDialog } from "@/common/components/modal-wrappper";

const REQUIRED_IMAGE_COUNT = 5;
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export function SellerOrderDetailsScreen() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();
  const { orderId } = useParams();
  const { data, isFetching } = useGetASellerOrderQuery(orderId ?? "");
  const {
    data: sellerImageVerification,
    isLoading: isLoadingVerificationImage,
  } = useGetSellerVerificationImages(orderId ?? "");
  const { isLoading } = useAppSelector((state) => state.root);
  const sellerUploadMutation = useUploadSellerVerifyImages();
  const [imageMap, setImageMap] = useState(new Map());

  const dataURLtoFile = (dataurl: any, filename: string) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };
  // Handler for when an image is captured/selected
  const handleImageCapture = (id: any, imageData: any) => {
    setImageMap((prevMap) => {
      const newMap = new Map(prevMap);
      if (imageData) {
        newMap.set(id, imageData);
      } else {
        newMap.delete(id);
      }
      return newMap;
    });
  };

  // Upload images
  const uploadImages = async () => {
    const imageCount = imageMap.size;

    if (imageCount !== REQUIRED_IMAGE_COUNT) {
      setErrorMessage(
        `Please select exactly ${REQUIRED_IMAGE_COUNT} images to complete the verification`
      );
      return;
    }

    setErrorMessage("");

    const formData = new FormData();
    Array.from(imageMap.entries()).forEach(([_, value]) => {
      console.log(value);
      formData.append("media", dataURLtoFile(value, "test"));
    });

    try {
      console.log(formData);
      await sellerUploadMutation.mutateAsync({
        orderId: orderId || "",
        imagesData: formData,
      });

      toast({
        variant: "success",
        title: "",
        description: SUCCESS_RESPONSE_CREATE_RECORD.replace(
          "{{MODEL}}",
          "Verification"
        ),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error?.response?.data?.msg || "Failed to upload verification images",
        duration: 5000,
      });
    }
  };

  if (isFetching || isLoadingVerificationImage) {
    return (
      <div className="relative flex items-center justify-center h-full">
        <OverlaySpinner open={true} />
      </div>
    );
  }

  if (!data?.data) {
    return <div className="p-4">No order data found</div>;
  }

  const { order, order_status } = data.data;
  console.log(sellerImageVerification);
  return (
    <div className="p-4 font-OpenSans">
      {/* Order status section */}
      <div className="relative border border-light-gray rounded-lg">
        <div className="flex justify-between border-b border-light-gray p-6">
          <h3 className="text-2xl font-medium">Ordered Item : 1</h3>
          <h3 className="text-2xl font-medium">Status</h3>
        </div>

        <div className="flex justify-between items-center p-6">
          <div className="flex gap-x-4">
            <img
              src="/sneaker.png"
              width={50}
              alt={order.productName}
              className="border border-light-gray"
            />
            <div className="flex flex-col gap-y-4">
              <span className="text-2xl font-medium">{order.productName}</span>
              <span className="text-xl">
                {formatDate(order.orderDate as string)}
              </span>
            </div>
          </div>
          <OrderSelectStatus status={order_status} id={orderId || ""} />
        </div>
        {isLoading && <OverlaySpinner open={true} />}
      </div>

      {/* Payment details section */}
      <div className="border border-light-gray rounded-lg mt-12">
        <div className="flex justify-between border-b border-light-gray p-6">
          <h3 className="text-2xl font-medium">Payment</h3>
          <h3 className="text-2xl font-medium">Status</h3>
        </div>

        <div className="flex justify-between items-center p-6">
          <div className="flex flex-col gap-y-4">
            <span className="text-2xl font-medium">Paid via Bank Transfer</span>
            <span className="text-xl">{formatDate(new Date())}</span>
          </div>

          <span className="text-[#28A78B] bg-opacity-15 bg-[#28A78B] px-6 py-2 text-xl font-OpenSans">
            Paid
          </span>
        </div>

        <div className="border-t border-light-gray flex flex-col gap-y-4 p-6">
          <div className="flex justify-between text-xl">
            <span>Subtotal</span>
            <span>{currencyFormmater(14000)}</span>
          </div>
          <div className="flex justify-between text-xl">
            <span>Transaction Fee</span>
            <span>{currencyFormmater(100)}</span>
          </div>
          <div className="flex justify-between text-xl">
            <span>Shipping Fee</span>
            <span>{currencyFormmater(0)}</span>
          </div>
          <div className="flex justify-between text-xl">
            <span className="font-bold">Total</span>
            <span className="font-bold">{currencyFormmater(14100)}</span>
          </div>
        </div>
      </div>

      {/* Product verification section */}
      <div className="border border-light-gray rounded-lg mt-12">
        <div className="flex justify-between border-b border-light-gray p-6 items-center">
          <div className="flex gap-x-4 items-center">
            <h3 className="text-2xl font-medium">
              Product visual verification
            </h3>
            <ModalWrapperDialog
              trigger={
                <div
                  ref={triggerRef}
                  className="text-blue underline text-lg cursor-pointer"
                >
                  Tips to take pro photos and get verified easily
                </div>
              }
              hasOverlay={false}
              title="Photo tips"
              className="md:max-w-[700px] z-[15000]"
              footer={
                <div className="w-full px-12 pt-3">
                  <Button
                    className="w-full bg-primary text-white hover:bg-primary hover:text-white"
                    onClick={() => triggerRef.current!.click()}
                  >
                    Got It
                  </Button>
                </div>
              }
            >
              <div>
                <p className="text-light-gray-600 text-2xl font-OpenSans ">
                  To ensure precise product verification, please upload 5
                  real-time photos of the sneakers. Real-time images guarantee
                  the sneakers shown are the exact ones you’ll deliver.
                </p>
                <div className="grid gap-x-6 gap-y-4 grid-cols-1 md:grid-cols-2 pt-8 ">
                  <div className="h-[300px]">
                    <img
                      src="/correct-sneaker-pic.png"
                      alt="correct-sneaker-picture"
                      className="h-full rounded-3xl"
                    />
                  </div>
                  <div className="h-[300px]">
                    <img
                      src="/bad-sneaker-pic.png"
                      alt="bad-sneaker-picture"
                      className="h-full rounded-3xl"
                    />
                  </div>
                </div>
                <h2 className="text-xl md:text-3xl font-semibold font-Montserrat mt-6 mb-8">
                  {" "}
                  Photo Requirements:
                </h2>
                <ol className="font-OpenSans font-normal text-lg md:text-2xl text-black   py-3 list-none counter-reset-step">
                  <li className=" pb-3 flex">
                    <span className=" ">1</span>
                    <span className="ml-4">
                      Full Profile: Capture a side view of both sneakers
                      together, highlighting the design, shape, and alignment.
                    </span>
                  </li>
                  <li className="pb-3 flex">
                    <span className=" ">2</span>
                    <span className="ml-4">
                      Sole Details: Close-up of both soles to showcase tread
                      patterns and any branding.
                    </span>
                  </li>
                  <li className="pb-3 flex">
                    <span className=" ">3</span>
                    <span className="ml-4">
                      Top View & Lacing: Take a top-down photo of both sneakers,
                      emphasizing the lacing and upper profile.
                    </span>
                  </li>
                  <li className="pb-3 flex">
                    <span className=" ">4</span>
                    <span className="ml-4">
                      Logo & Size Label: Photograph brand logos and the size
                      label inside the sneaker, showing size, brand, and serial
                      numbers clearly.
                    </span>
                  </li>
                  <li className="pb-3 flex">
                    <span className=" ">5</span>
                    <span className="ml-4">
                      Material & Stitching Quality: Focus on close-ups of
                      material, stitching, and color to verify quality.
                    </span>
                  </li>
                </ol>
                <div className="grid gap-x-6 gap-y-4 grid-cols-1 md:grid-cols-2 pt-8 ">
                  <div className="h-[300px]">
                    <img
                      src="/sneaker-sample-1.png"
                      alt="correct-sneaker-picture"
                      className="h-full rounded-3xl"
                    />
                  </div>
                  <div className="h-[300px]">
                    <img
                      src="/sneaker-sample-2.png"
                      alt="correct-sneaker-picture"
                      className="h-full rounded-3xl"
                    />
                  </div>
                  <div className="h-[300px]">
                    <img
                      src="/sneaker-sample-3.png"
                      alt="correct-sneaker-picture"
                      className="h-full rounded-3xl"
                    />
                  </div>
                  <div className="h-[300px]">
                    <img
                      src="/sneaker-sample-4.png"
                      alt="correct-sneaker-picture"
                      className="h-full rounded-3xl"
                    />
                  </div>
                </div>
                <h2 className="text-xl md:text-3xl font-semibold font-Montserrat mt-6 mb-8">
                  Photo Quality Tips:
                </h2>
                <p className="text-2xl font-OpenSans">
                  Real-Time Only: Use live photos, not from your gallery, to
                  maintain authenticity.
                </p>
                <ul className="list-disc font-OpenSans text-lg md:text-2xl pl-8 mt-4 space-y-3">
                  <li>
                    Natural Lighting: Use well-lit areas for detailed images.
                  </li>
                  <li>
                    White Background: A clean, white background enhances clarity
                    for verification.
                  </li>
                  <li>
                    High-Resolution: Ensure photos are sharp and focused for
                    accurate assessment.
                  </li>
                </ul>
              </div>
            </ModalWrapperDialog>
          </div>

          <span className="text-[#007AFF] bg-[#007AFF] bg-opacity-15 px-6 py-2 text-xl font-OpenSans">
            Unverified
          </span>
        </div>

        {errorMessage && (
          <p className="text-destructive pl-6 pt-4">{errorMessage}</p>
        )}
        {sellerImageVerification &&
        sellerImageVerification?.urls.urls.length > 0 ? (
          <DisplayVerificationImage
            images={sellerImageVerification.urls.urls}
          />
        ) : (
          <div className="flex flex-col p-6 gap-y-12 relative">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {[...Array(REQUIRED_IMAGE_COUNT)].map((_, index) => (
                <ImagePickerFactory
                  key={index}
                  type="camera"
                  onChange={handleImageCapture}
                />
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                size="lg"
                className="px-24 bg-blue border-blue hover:text-blue"
                onClick={uploadImages}
                disabled={sellerUploadMutation.isPending}
              >
                Verify
              </Button>
            </div>

            {sellerUploadMutation.isPending && <OverlaySpinner open={true} />}
          </div>
        )}
      </div>
    </div>
  );
}
