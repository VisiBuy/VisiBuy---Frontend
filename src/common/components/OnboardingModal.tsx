
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { setUser } from "@/modules/Auth/features/slices";
import { useDispatch } from "react-redux";
import AuthService from "@/modules/Auth/lib/service";
import {
  VisibuyWelcomeImage,
  trackOrderImage,
  notificationsImage,
  orderDetailsImage,
  vveModalImage,
  topDownView,
  sideView,
  logoAndSize,
  materialAndStitching,
  soleCloseup,
  approveOrderImage,
  cancelOrderImage,
  fileReportImage,
} from "@/assets/onboarding";


const slides = [
  {
    title: "Welcome to VisiBuy",
    body: (
      <>
        VisiBuy is a ecommerce platform transforming the ecommerce ecosystem
        through Visual Verification
        <br />
        <br />
        With our “<strong>What You See Is What You Get</strong>” process, you
        can visually confirm your product before it ships.
        <br />
        <br />
        <strong>Verify Before It Ships — Your Money is Safe: </strong>
        Before we ship your sneakers, the seller uploads{" "}
        <strong>5 real photos </strong>
        for you to inspect. Your payment is held in escrow until you approve the
        item.
      </>
    ),
    imgSrc: VisibuyWelcomeImage,
    alt: "Visibuy Introduction",
  },
  {
    title: "How to Verify Your Order",
    body: (
      <>
        After placing your order, you’ll be notified when verification photos
        are submitted.
        <br />
        Go to <strong>Track Order</strong> in your account and click your order
        to open the details page.
      </>
    ),
    imgSrc: [notificationsImage, trackOrderImage],
    alt: "Track order process",
  },
  {
    title: "Open Verification",
    body: (
      <>
        On the order details page, click the <strong>Verify Order</strong>{" "}
        button to open the verification modal.
        <br />
        When the modal opens up, then click on the images one by one to view in
        fullscreen and access thoroughly before approving.
      </>
    ),
    imgSrc: [orderDetailsImage, vveModalImage],
    alt: "Verification modal",
  },
  {
    title: "Side View of Sneakers",
    body: "Check the side profile for visible defects or mismatches.",
    imgSrc: sideView,
    alt: "Side view",
  },
  {
    title: "Sole Close-Up",
    body: "Inspect the sole's tread pattern and branding for authenticity.",
    imgSrc: soleCloseup,
    alt: "Sole image",
  },
  {
    title: "Top-Down View",
    body: "Look at the laces, toe box, and overall silhouette.",
    imgSrc: topDownView,
    alt: "Top-down sneakers",
  },
  {
    title: "Logo and Size Label",
    body: "Confirm that the brand logo and size label are correct and clear.",
    imgSrc: logoAndSize,
    alt: "Label image",
  },
  {
    title: "Material & Stitching",
    body: "Examine material quality and stitching to ensure it's genuine.",
    imgSrc: materialAndStitching,
    alt: "Stitching close-up",
  },
  {
    title: "Approve or Cancel",
    body: (
      <>
        Once you click <strong>Yes</strong> on the verification modal, ur order
        will be automatically approved and ready to be shipped.
        <br />
        And once you click <strong>No</strong> on the verification modal, ur order will be
        automatically cancelled and your money will be refunded.
      </>
    ),
    imgSrc: [approveOrderImage, cancelOrderImage],
    alt: "Approve or cancel",
  },
  {
    title: "Need Help?",
    body: (
      <>
        If your sneakers don’t match the approved photos, file a dispute.
        <br />
        Click <strong>File Dispute</strong> and our support team will help
        resolve the issue or issue a refund.
      </>
    ),
    imgSrc: fileReportImage,
    alt: "File report",
    cta: {
      text: "Learn More / Contact Support",
      href: "/dashboard/buyer/report",
    },
  },
];

export default function OnboardingModal({onFinish}:{onFinish: any}) {
  const [step, setStep] = useState(0);
  const totalSteps = slides.length;
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const completeOnboarding = async () => {
    try {
      setLoading(true);
      await AuthService.updateUser("buyer", { hasCompletedOnboarding: true });
      const updatedUser = await AuthService.getCurrentUser("buyer");
      dispatch(setUser(updatedUser));
      await queryClient.invalidateQueries();
      onFinish(); // ✅ Hide modal
    } catch (err) {
      console.error("Onboarding completion failed", err);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < totalSteps - 1) setStep((s) => s + 1);
    else completeOnboarding();
  };

  const prevStep = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const currentSlide = slides[step];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white text-blue w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[800px] xl:max-w-[1000px] h-[90vh] max-h-[90vh] rounded-xl shadow-xl overflow-hidden flex flex-col p-6 relative">
        {/* Progress Bar */}
        <div className="h-2 bg-blue-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Slide Content */}
        <div className="flex-1 overflow-y-auto pr-1">
          <h2 className="text-2xl font-Montserrat font-bold mb-4">
            {currentSlide.title}
          </h2>
          <div className="mb-6 text-base font-OpenSans leading-relaxed">
            {currentSlide.body}
          </div>

          {/* Image(s) */}
          <div
            className={`flex ${
              Array.isArray(currentSlide.imgSrc)
                ? "flex-row flex-wrap"
                : "flex-col"
            } gap-4 justify-center items-center mb-6`}
          >
            {Array.isArray(currentSlide.imgSrc) ? (
              currentSlide.imgSrc.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={currentSlide.alt}
                  className="w-full sm:w-[45%] max-h-[400px] object-contain rounded-md shadow"
                />
              ))
            ) : (
              <img
                src={currentSlide.imgSrc}
                alt={currentSlide.alt}
                className="w-full max-h-[400px] object-contain rounded-md shadow"
              />
            )}
          </div>

          {/* CTA Button */}
          {currentSlide.cta && (
            <a
              href={currentSlide.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 bg-blue-100 font-OpenSans text-blue-800 rounded-md font-medium hover:bg-blue-200 transition"
            >
              {currentSlide.cta.text}
            </a>
          )}
        </div>

        {/* Step Navigator Buttons */}
        <div className="mt-4 flex justify-between items-center">
          {/* Back button appears when step > 0 */}
          {step > 0 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-blue-100 text-blue-800 font-OpenSans rounded-md hover:bg-blue-200 transition"
            >
              Back
            </button>
          )}

          {/* Step button or Finish */}
          <button
            onClick={nextStep}
            disabled={loading}
            className="px-4 py-2 bg-blue text-white rounded-md font-OpenSans font-semibold hover:bg-blue-700 transition"
          >
            {loading
              ? "Finishing..."
              : step === totalSteps - 1
                ? `Step ${step + 1} → Finish `
                : `Step ${step + 1}`}
          </button>
        </div>
      </div>
    </div>
  );
}
