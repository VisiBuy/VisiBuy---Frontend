import OrderSelectStatus from "../../../../common/components/status-selector";
import { currencyFormmater, formatDate } from "../../../../lib/utils";
import { Button } from "../../../../ui/Button";
import { useRef, useState } from "react";
import { Link, useParams, redirect } from "react-router-dom";
import { useGetASellerOrderQuery } from "../../queries/order/queries";
import { RootState } from "../../../../store/store";
import { useAppSelector } from "../../../../hooks/app-hooks";
import { OverlaySpinner } from "../../../../common/components/modal-spinner";

export function SellerOrderDetailsScreen() {
  const { orderId } = useParams();
  const { data, isFetching } = useGetASellerOrderQuery(orderId ?? "");
  const root = useAppSelector((state: RootState) => state.root);

  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check permissions.");
    }
  };

  // Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, 640, 480);

      // Convert canvas to data URL (base64 image)
      const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
      setImageSrc(imageDataUrl);

      // Optional: Store in localStorage
      localStorage.setItem("capturedImage", imageDataUrl);
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Save image to file
  const saveImage = () => {
    if (imageSrc) {
      const link = document.createElement("a");
      link.href = imageSrc;
      link.download = `captured-${new Date().toISOString()}.jpg`;
      link.click();
    }
  };

  // Upload image (example function)
  const uploadImage = async () => {
    if (imageSrc) {
      try {
        // Convert base64 to blob
        const response = await fetch(imageSrc);
        const blob = await response.blob();

        // Create FormData
        const formData = new FormData();
        formData.append("image", blob, "captured-image.jpg");

        // Example upload (replace with your actual upload logic)
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await uploadResponse.json();
        console.log("Upload successful:", result);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };
  return (
    <>
      {isFetching && (
        <div className='relative flex items-center justify-center h-full'>
          <OverlaySpinner open={isFetching} />
        </div>
      )}

      {data?.data && (
        <div className='p-4 font-OpenSans'>
          <div className=' relative border border-light-gray rounded-lg'>
            <div className='flex justify-between border-b border-light-gray p-6'>
              <h3 className='text-2xl font-medium'>Ordered Item : 1</h3>
              <h3 className='text-2xl font-medium'>Status</h3>
            </div>

            <div className='flex justify-between items-center  p-6'>
              <div className='flex gap-x-4'>
                <img
                  src='/sneaker.png'
                  width={50}
                  className='border border-light-gray'
                />
                <div className='flex flex-col gap-y-4'>
                  <span className='text-2xl font-medium'>
                    {data?.data.order.productName}
                  </span>
                  <span className='text-xl'>
                    {formatDate(data?.data?.order?.orderDate)}
                  </span>
                </div>
              </div>
              <OrderSelectStatus
                status={data!.data!.order_status}
                id={orderId || ""}
              />
            </div>
            <OverlaySpinner open={root.isLoading} />
          </div>
          <div className='border border-light-gray rounded-lg mt-12'>
            <div className='flex justify-between border-b border-light-gray p-6'>
              <h3 className='text-2xl font-medium'>Payment</h3>
              <h3 className='text-2xl font-medium'>Status</h3>
            </div>

            <div className='flex justify-between items-center  p-6'>
              <div className='flex flex-col gap-y-4'>
                <span className='text-2xl font-medium'>
                  Paid via Bank Transfer
                </span>
                <span className='text-xl'>{formatDate(new Date())}</span>
              </div>

              <span className='text-[#28A78B] bg-opacity-15 bg-[#28A78B] px-6 py-2 text-xl font-OpenSans'>
                Paid
              </span>
            </div>
            <div className='border-t border-light-gray flex flex-col gap-y-4 p-6 '>
              <div className='flex justify-between text-xl'>
                <span>Subtotal</span>
                <span>{currencyFormmater(14000)}</span>
              </div>
              <div className='flex justify-between text-xl'>
                <span>Transaction Fee</span>
                <span>{currencyFormmater(100)}</span>
              </div>
              <div className='flex justify-between text-xl'>
                <span>Shipping Fee</span>
                <span>{currencyFormmater(0)}</span>
              </div>
              <div className='flex justify-between text-xl'>
                <span className='font-bold'>Total</span>
                <span className='font-bold'>{currencyFormmater(14100)}</span>
              </div>
            </div>
          </div>
          <div className='border border-light-gray rounded-lg mt-12'>
            <div className='flex justify-between border-b border-light-gray p-6'>
              <h3 className='text-2xl font-medium'>
                Product visual verification
                <span>
                  <Link
                    to=''
                    className='text-blue underline ml-4 font-normal text-lg'
                  >
                    Tips to take pro photos and get verified easily
                  </Link>
                </span>
              </h3>
              <span className='text-[#007AFF] bg-[#007AFF] bg-opacity-15 px-6 py-2 text-xl font-OpenSans'>
                Unverified
              </span>
            </div>

            <div className='flex flex-col justify-end items-end  p-6 gap-y-12'>
              <div className='flex gap-x-4'>
                <div className='camera-capture-container'>
                  <div className='camera-controls'>
                    <button onClick={startCamera}>Start Camera</button>
                    <button onClick={stopCamera}>Stop Camera</button>
                    <button onClick={capturePhoto}>Capture Photo</button>
                    {imageSrc && (
                      <>
                        <button onClick={saveImage}>Save Image</button>
                        <button onClick={uploadImage}>Upload Image</button>
                      </>
                    )}
                  </div>

                  <div className='camera-preview'>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      width={640}
                      height={480}
                    />
                    <canvas
                      ref={canvasRef}
                      width={640}
                      height={480}
                      style={{ display: "none" }}
                    />
                  </div>

                  {imageSrc && (
                    <div className='captured-image'>
                      <h3>Captured Image:</h3>
                      <img
                        src={imageSrc}
                        alt='Captured'
                        width={320}
                        height={240}
                      />
                    </div>
                  )}
                </div>
              </div>
              <Button className='px-24 bg-blue border-blue hover:text-blue'>
                Verify
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
