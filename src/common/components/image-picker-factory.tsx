import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import { Camera, X, Upload } from "lucide-react";
import Webcam from "react-webcam";
import { cn, ImageLinkMap } from "@/lib/utils";
import { useToast } from "@/ui/use-toast";
interface ImagePickerProps {
  onChange: (id: string, imageLink?: string, imageFile?: File) => void;
  onRemoveImage?: (id: string | undefined) => void;
  className?: string;
  imageLink?: string;
  imageLinkId?: string;
}
// Define props interfaces
interface ImagePickerFactoryProps extends ImagePickerProps {
  type: "camera" | "file";
}

const ImagePickerFactory: React.FC<ImagePickerFactoryProps> = ({
  type,
  onChange,
  onRemoveImage,
  className,
  imageLinkId,
  imageLink,
}) => {
  // Return the appropriate component based on type
  return type === "camera" ? (
    <CameraImagePicker className={className} onChange={onChange} />
  ) : (
    <FileImagePicker
      onChange={onChange}
      onRemoveImage={onRemoveImage}
      className={className}
      {...(imageLink && { imageLink, imageLinkId })}
    />
  );
};

const CameraImagePicker: React.FC<ImagePickerProps> = ({ onChange }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageId = useId();
  
  // Check if getUserMedia is supported
  const isGetUserMediaSupported = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };
  
<<<<<<< HEAD
  const videoConstraints = {
    width: { ideal: window.innerWidth },
    height: { ideal: window.innerHeight },
=======
  // Updated video constraints to ensure minimum 1000px resolution
  const videoConstraints = {
    width: { min: 1000, ideal: Math.max(1000, window.innerWidth) },
    height: { min: 1000, ideal: Math.max(1000, window.innerHeight) },
>>>>>>> staging
    facingMode: "environment", // Use back camera
  };
  
  const handleUserMedia = useCallback(() => {
    setIsCameraReady(true);
  }, []);
  
  const handleUserMediaError = useCallback((error: string | DOMException) => {
    console.error("Camera error:", error);
    // More graceful error handling
    setIsCameraReady(false);
    
    // Open file input as fallback
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);
  
  const openCamera = () => {
    // Check if getUserMedia is supported
    if (!isGetUserMediaSupported()) {
      console.log("getUserMedia is not supported, using file input fallback");
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
      return;
    }
    
    setIsFullScreen(true);
    setIsCameraReady(false); // Reset camera status
    
    // Small delay to ensure DOM is updated before accessing camera
    setTimeout(() => {
      setIsCameraReady(true);
    }, 100);
  };
  
  const closeCamera = () => {
    setIsFullScreen(false);
    setIsCameraReady(false);
  };
  
  // File input handler as fallback
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageSrc = event.target?.result as string;
        if (imageSrc) {
          // Update local state and call onChange to notify parent
          setImage(imageSrc);
          onChange(imageId, imageSrc);
        }
      };
      reader.readAsDataURL(file);
    }
    
    // Reset the input value so the same file can be selected again
    if (e.target) {
      e.target.value = '';
    }
  };
  
  // Capture and preview states
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
<<<<<<< HEAD
  const handleCapture = useCallback(() => {
    if (webcamRef.current) {
      try {
        const imageSrc = webcamRef.current.getScreenshot();
=======
  // Enhanced capture to ensure minimum 1000px resolution
  const handleCapture = useCallback(() => {
    if (webcamRef.current) {
      try {
        // Get the webcam's native dimensions to ensure we maintain aspect ratio
        const video = webcamRef.current.video;
        let width = 1000;
        let height = 1000;
        
        if (video) {
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;
          const aspectRatio = videoWidth / videoHeight;
          
          // Maintain aspect ratio while ensuring minimum 1000px for both dimensions
          if (videoWidth > videoHeight) {
            width = Math.max(1000, videoWidth);
            height = width / aspectRatio;
          } else {
            height = Math.max(1000, videoHeight);
            width = height * aspectRatio;
          }
        }
        
        // Set screenshot options with calculated dimensions
        const screenshotOptions = {
          width: width,
          height: height
        };
        
        const imageSrc = webcamRef.current.getScreenshot(screenshotOptions);
>>>>>>> staging
        if (imageSrc) {
          setPreviewImage(imageSrc);
          setShowPreview(true);
        } else {
          console.error("Failed to capture image - no image data returned");
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        }
      } catch (error) {
        console.error("Error capturing image:", error);
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      }
    }
  }, [webcamRef]);
  
  const confirmImage = () => {
    if (previewImage) {
      // Update local state
      setImage(previewImage);
      // Call onChange to notify parent without triggering react-query reload
      onChange(imageId, previewImage);
      
      // Close the camera view
      setShowPreview(false);
      setIsFullScreen(false);
    }
  };
  
  const retakeImage = () => {
    setPreviewImage(null);
    setShowPreview(false);
  };

  const resetImage = (): void => {
    onChange(imageId);
    setImage(null);
  };
  
  if (isFullScreen) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {showPreview ? (
          // Preview captured image with confirm/retake options
          <div className="relative w-full h-full flex flex-col">
            <div className="flex-1 relative">
              <img 
                src={previewImage || ''} 
                alt="Preview" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Fixed position for confirm/retake buttons - ensures visibility on all devices */}
            <div className="fixed bottom-0 left-0 right-0 flex justify-between p-4 bg-black bg-opacity-70 w-full">
              <button
                onClick={retakeImage}
                className="bg-gray-800 text-white px-6 py-3 rounded-md text-lg font-medium"
              >
                Retake
              </button>
              <button
                onClick={confirmImage}
                className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium"
              >
                Confirm
              </button>
            </div>
            
            {/* Add exit button */}
            <button
              onClick={closeCamera}
              className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full opacity-80 hover:opacity-100 z-10"
              aria-label="Exit"
            >
              <X size={24} />
            </button>
          </div>
        ) : (
          // Full-screen camera
          <div className="relative w-full h-full">
            {isCameraReady ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onUserMedia={handleUserMedia}
                onUserMediaError={handleUserMediaError}
                mirrored={false}
                className="w-full h-full object-cover"
<<<<<<< HEAD
=======
                screenshotQuality={0.95} // High quality screenshot
>>>>>>> staging
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black">
                <div className="text-white text-lg">Accessing camera...</div>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
              <button
                onClick={closeCamera}
                className="bg-gray-800 text-white p-3 rounded-full opacity-80 hover:opacity-100"
              >
                <X size={24} />
              </button>
              
              {isCameraReady && (
                <button
                  onClick={handleCapture}
                  className="bg-white p-4 rounded-full opacity-90 hover:opacity-100"
                  aria-label="Take photo"
                >
                  <Camera size={32} color="black" />
                </button>
              )}
              
              <div className="w-12"></div> {/* Space balancer for flex layout */}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="relative w-40 h-40 lg:w-64 lg:h-64 border border-[#7F8081] p-3 rounded-lg flex items-center justify-center overflow-hidden">
<<<<<<< HEAD
      {/* Hidden file input as fallback */}
=======
      {/* Enhanced file input to also enforce minimum resolution */}
>>>>>>> staging
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileInputChange}
        className="hidden"
        aria-hidden="true"
      />
      
      {image ? (
        // Display captured image with remove and retake buttons
        <div className="relative w-full h-full">
          <img
            src={image}
            alt="Captured"
            className="w-full h-full object-cover"
          />
          <button
            onClick={resetImage}
            className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full opacity-80 hover:opacity-100"
            aria-label="Remove image"
          >
            <X size={20} />
          </button>
          <button
            onClick={openCamera}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium opacity-80 hover:opacity-100"
          >
            Retake Photo
          </button>
        </div>
      ) : (
        // Initial state - click to start camera
        <div
          onClick={openCamera}
          className="flex flex-col items-center justify-center cursor-pointer w-full h-full bg-[#E3E3E3] rounded-md"
        >
          <p className="text-gray-500 text-center text-sm md:text-xl p-4">
            Click here to take a picture of your product.
          </p>
        </div>
      )}
    </div>
<<<<<<< HEAD
  );
=======
  ); 
>>>>>>> staging
};


const FileImagePicker: React.FC<ImagePickerProps> = ({
  onChange,
  onRemoveImage,
  className,
  imageLink,
  imageLinkId,
}) => {
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(imageLink ?? null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropAreaRef = useRef<HTMLDivElement | null>(null);
  const imageId = useId();
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = event.target.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      // Validate file size (5MB)
      if (files[0].size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Invalid image size",
          description: "Image size must be less than 5MB ",
          duration: 5000,
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === "string") {
          onChange(imageId, e.target.result, files[0]);
          setImage(e.target.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (onRemoveImage) {
      onRemoveImage((e.target as HTMLElement).id);
    }

    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Set up drag and drop handlers
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return;

    const preventDefault = (e: Event): void => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragOver = (e: DragEvent): void => {
      preventDefault(e);
      dropArea.classList.add("border-blue-500", "bg-blue-50");
    };

    const handleDragLeave = (e: DragEvent): void => {
      preventDefault(e);
      dropArea.classList.remove("border-blue-500", "bg-blue-50");
    };

    const handleDrop = (e: DragEvent): void => {
      preventDefault(e);
      dropArea.classList.remove("border-blue-500", "bg-blue-50");

      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.size > 5 * 1024 * 1024) {
          toast({
            variant: "destructive",
            title: "Invalid image size",
            description: "Image size must be less than 5MB ",
            duration: 5000,
          });
          return;
        }
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && typeof e.target.result === "string") {
              setImage(e.target.result);
              onChange(imageId, e.target.result, file);
              setImage(e.target.result);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    };

    dropArea.addEventListener("dragover", handleDragOver as EventListener);
    dropArea.addEventListener("dragleave", handleDragLeave as EventListener);
    dropArea.addEventListener("drop", handleDrop as EventListener);

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver as EventListener);
      dropArea.removeEventListener(
        "dragleave",
        handleDragLeave as EventListener
      );
      dropArea.removeEventListener("drop", handleDrop as EventListener);
    };
  }, []);

  return (
    <div
      ref={dropAreaRef}
      onClick={handleClick}
      className={cn(
        "relative w-64 h-64 border-2 p-3 border-[#7F8081] rounded-lg flex items-center justify-center overflow-hidden  transition-colors duration-200 cursor-pointer",
        className
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {image ? (
        <div className="relative w-full h-full">
          <img
            src={image}
            alt="Selected"
            className="w-full h-full object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full opacity-80 hover:opacity-100"
            aria-label="Remove image"
          >
            <X size={20} id={imageLinkId ?? imageId} />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full bg-[#E3E3E3] rounded-md">
          <p className="text-gray-500 text-center px-2  py-4  md:text-sm">
            Drag your image here, or select{" "}
            <span className="text-blue "> Click to browse</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ImagePickerFactory;
