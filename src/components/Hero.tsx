import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { Shield, Eye, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const sneakerImages = [
    "src/assets/onboarding/logo-and-size.jpg",
    "src/assets/onboarding/material-and-stitching.jpg",
    "src/assets/onboarding/side-view.jpg",
    "src/assets/onboarding/sole-closeup.jpg",
    "src/assets/onboarding/top-down-view.jpg",
  ];

  return (
    <section className="relative min-h-screen bg-visibuy-blue-light overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-black rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border-2 border-black transform rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-black rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 lg:pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-black space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-7xl font-bold leading-tight">
                What You See Is
                <span className="block text-visibuy-blue">What You Get</span>
              </h1>
              <p className="text-xl lg:text-2xl opacity-80 leading-relaxed">
                Every product is visually verified before delivery. You approve
                the item before dispatch — no fakes, no surprises.
              </p>
            </div>

            {/* Trust Line */}
            <div className="bg-visibuy-green/20 backdrop-blur-sm rounded-lg p-4 border border-visibuy-green/30">
              <p className="text-lg font-semibold text-black">
                💰 Your payment is held securely until you approve your order.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-visibuy-green text-white hover:bg-visibuy-green/90 text-lg px-8 py-6 font-semibold transition-all hover:scale-105"
              >
                🛍️ Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-black text-black hover:bg-black hover:text-white text-lg px-8 py-6 font-semibold transition-all hover:scale-105"
              >
                👀 How It Works
              </Button>
            </div>

            {/* Trust Strip */}
            <div className="grid sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center gap-2 text-sm">
                <Eye className="w-5 h-5 text-visibuy-green" />
                <span>Verified by You</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-5 h-5 text-visibuy-blue" />
                <span>Escrow Protected</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Lock className="w-5 h-5 text-visibuy-gold" />
                <span>You're in Control</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative animate-scale-in">
            <div className="relative bg-white rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="aspect-square bg-visibuy-gray rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={sneakerImages[selectedImage]}
                  alt="Jordan 1 Chicago"
                  className="w-full h-full object-cover"
                />
              </div>
              <Badge className="absolute -top-2 -right-2 bg-visibuy-green text-white px-3 py-1">
                ✅ VERIFIED
              </Badge>
              <h3 className="font-bold text-black text-lg">
                Air Jordan 1 "Chicago"
              </h3>
              <p className="text-black opacity-70">₦85,000</p>
              <div className="mt-4 flex gap-2">
                {sneakerImages.slice(0, 5).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-12 h-12 rounded border-2 overflow-hidden transition-all ${
                      selectedImage === index
                        ? "border-visibuy-green scale-105"
                        : "border-visibuy-gray hover:border-visibuy-green/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Verification image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-visibuy-green mt-2 font-semibold">
                ✅ 5 verification photos approved
              </p> 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
