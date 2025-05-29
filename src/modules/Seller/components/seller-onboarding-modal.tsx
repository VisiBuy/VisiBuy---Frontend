import { useAppSelector } from "@/hooks/app-hooks";
import { dashboardConfig } from "@/lib/config";
import { Role } from "@/modules/Auth/models/types";
import { useUpdateSeller } from "@/modules/Auth/mutations/update-seller";
import { RootState } from "@/store/store";
import { useToast } from "@/ui/use-toast";
import {
  ChevronRight,
  ChevronLeft,
  Package,
  Camera,
  CheckCircle,
  Eye,
  Star,
  Zap,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerOnboardingModal = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state?.auth?.user);
  const totalSteps = 11;

  useEffect(() => {
    if (user && !user.hasCompletedOnboarding) {
      setIsVisible(true);
    }
  }, [user]);

  const updateSellerOnboardingMutatuion = useUpdateSeller();
  const handleUpdateSellerOnboarding = async () => {
    try {
      await updateSellerOnboardingMutatuion.mutateAsync({
        hasCompletedOnboarding: true,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.response?.data?.msg || "Something went wrong",
        duration: 5000,
      });
    }
  };

  const steps = [
    {
      title: "Welcome to the Trusted Seller Network",
      content:
        "On Visibuy, buyers get to approve every product before it ships. You'll upload 5 real photos after each order — we'll walk you through it.",
      icon: <Star className="w-16 h-16 text-green-500 mx-auto mb-6" />,
      hasSkip: false,
    },
    {
      title: "How to List Your Product",
      content:
        "Create a sneaker listing with brand, model, sizes, price, and up to 4 display images. After a buyer places an order, you'll be asked to upload 5 verification photos of that exact item.",
      icon: <Package className="w-16 h-16 text-green-500 mx-auto mb-6" />,
      steps: [
        "List your sneaker",
        "Wait for buyer order",
        "Upload 5 verification photos",
        "Buyer approves → Delivery starts",
        "You get paid",
      ],
    },
    {
      title: "Why Buyers Trust Verified Products",
      content:
        "Buyers will see the exact product before paying. Clear, honest photos = more approvals, fewer disputes, faster payouts.",
      icon: <Eye className="w-16 h-16 text-green-500 mx-auto mb-6" />,
    },
    {
      title: "1. Side View",
      content: "Both sneakers from the side — placed together.",
      tip: "Show both shoes side by side for size comparison",
      isPhotoStep: true,
      photoExample:
        "https://res.cloudinary.com/dqv9t8nri/image/upload/v1748348729/sneaker-back-view_h7lgv5.jpg",
    },
    {
      title: "2. Sole View",
      content: "Clear view of soles — show tread + logo.",
      tip: "Flip shoes to show bottom - buyers check authenticity here",
      isPhotoStep: true,
      photoExample:
        "https://res.cloudinary.com/dqv9t8nri/image/upload/v1748348730/sneaker-sole_fbv4rs.jpg",
    },
    {
      title: "3. Top View",
      content: "Laces, toe box, and tongue — top-down angle.",
      tip: "Capture from directly above to show lacing and tongue details",
      isPhotoStep: true,
      photoExample:
        "https://res.cloudinary.com/dqv9t8nri/image/upload/v1748348729/sneaket-front-view_gfznpx.jpg",
    },
    {
      title: "4. Logo & Size Tag",
      content: "Brand + size tag must be clearly visible.",
      tip: "Make sure text is readable - this verifies authenticity",
      isPhotoStep: true,
      photoExample:
        "https://res.cloudinary.com/dqv9t8nri/image/upload/v1748348731/sneaker-tag_mxiule.jpg",
    },
    {
      title: "5. Material & Stitching",
      content: "Close-up to show texture and finishing quality.",
      tip: "Show craftsmanship details - quality matters to buyers",
      isPhotoStep: true,
      photoExample:
        "https://res.cloudinary.com/dqv9t8nri/image/upload/v1748348729/sneaker-full-view_dzovjz.jpg",
    },
    {
      title: "Upload. Approve. Deliver. Get Paid.",
      content: "Once a buyer approves the 5 photos:",
      icon: <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />,
      steps: [
        "You'll be notified to prepare for delivery",
        "We release the order to the rider",
        "Payment is processed after delivery is confirmed",
        "No approval = No shipping.",
      ],
    },
    {
      title: "How to Sell Faster on Visibuy",
      content: "Follow these tips to maximize your success:",
      icon: <Zap className="w-16 h-16 text-green-500 mx-auto mb-6" />,
      steps: [
        "Use good lighting and clean backgrounds",
        "Upload fast after each order",
        "Follow the 5-angle format every time",
        "Keep your profile active for more exposure",
        "Earn the Verified Seller badge to appear at the top",
      ],
    },
    {
      title: "You're Ready to Start Selling",
      content: "You can now list your first product. Let's go!",
      icon: <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />,
      isFinal: true,
    },
  ];

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - mark onboarding complete and redirect
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = async () => {
    await handleUpdateSellerOnboarding();
    setIsVisible(false);
  };

  const handleComplete = async () => {
    // Mark onboarding as completed
    await handleUpdateSellerOnboarding();
    //alert("Onboarding completed! Redirecting to create your first product...");
    setIsVisible(false);
    navigate(dashboardConfig.getFullPath("seller" as Role, "products"));
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 font-OpenSans">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Progress Bar */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl text-gray-500">
              Step {currentStep + 1} of {totalSteps}
            </span>
            {currentStepData.hasSkip && (
              <button
                onClick={skipOnboarding}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Skip
              </button>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="text-center mb-8">
            {currentStepData.icon}

            {currentStepData.isPhotoStep && (
              <div className="mb-6">
                <div className="w-40 h-36 bg-gray-100 rounded-lg mx-auto flex items-center justify-center text-4xl mb-4">
                  <img
                    src={currentStepData.photoExample}
                    alt={currentStepData.title}
                    className="h-full"
                  />
                </div>
                <Camera className="w-8 h-8 text-green-500 mx-auto" />
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentStepData.title}
            </h2>

            <p className="text-gray-600 text-xl leading-relaxed">
              {currentStepData.content}
            </p>

            {currentStepData.tip && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700 text-lg font-medium">
                  💡 {currentStepData.tip}
                </p>
              </div>
            )}

            {currentStepData.steps && (
              <div className="mt-6 text-left">
                <ul className="space-y-3">
                  {currentStepData.steps.map((step, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-green-600 text-lg font-semibold">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-gray-700 text-lg">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-x-4">
            <button
              onClick={prevStep}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <button
              onClick={nextStep}
              disabled={updateSellerOnboardingMutatuion.isPending}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {currentStepData.isFinal ? "Create My First Product" : "Next"}
              {updateSellerOnboardingMutatuion.isPending ? (
                <Loader2 className="ml-2 animate-spin" />
              ) : (
                <ChevronRight className="w-5 h-5 ml-2" />
              )}
            </button>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index <= currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOnboardingModal;
