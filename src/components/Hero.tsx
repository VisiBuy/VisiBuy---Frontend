"use client";

import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { Shield, Eye, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";

const Hero = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [disclaimerVisible, setDisclaimerVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const colorSchemes = [
    { bg: "from-blue-400 via-blue-500 to-blue-600", bubbles: "bg-blue-300" },
    {
      bg: "from-green-400 via-green-500 to-green-600",
      bubbles: "bg-green-300",
    },
    {
      bg: "from-yellow-400 via-yellow-500 to-yellow-600",
      bubbles: "bg-yellow-300",
    },
  ];

  const sneakerImages = [
    "/side-view.jpg",
    "/logo-and-size.jpg",
    "/material-and-stitching.jpg",
    "/sole-closeup.jpg",
    "/top-down-view.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colorSchemes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down - hide disclaimer
        setDisclaimerVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show disclaimer
        setDisclaimerVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const currentScheme = colorSchemes[currentColorIndex];

  return (
    <section
      className={`relative min-h-screen overflow-hidden transition-all duration-300 ease-in-out ${
        disclaimerVisible ? "pt-[104px]" : "pt-16"
      }`}
    >
      {/* Animated Bubble Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentScheme.bg} transition-all duration-1000 ease-in-out`}
      >
        {/* Bubble Container */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Generate multiple bubbles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${currentScheme.bubbles} opacity-20 transition-colors duration-1000 animate-bubble-float`}
              style={{
                width: `${Math.random() * 100 + 20}px`,
                height: `${Math.random() * 100 + 20}px`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 4}s`,
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.1))`,
                backdropFilter: "blur(1px)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: `
                  inset 0 0 20px rgba(255,255,255,0.3),
                  0 0 20px rgba(255,255,255,0.2),
                  0 0 40px rgba(255,255,255,0.1)
                `,
              }}
            />
          ))}

          {/* Larger feature bubbles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`large-${i}`}
              className={`absolute rounded-full ${currentScheme.bubbles} opacity-30 transition-colors duration-1000 animate-bubble-float-slow`}
              style={{
                width: `${Math.random() * 150 + 80}px`,
                height: `${Math.random() * 150 + 80}px`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 4 + 6}s`,
                background: `radial-gradient(circle at 25% 25%, 
                  rgba(255,255,255,0.9), 
                  rgba(255,255,255,0.4) 40%, 
                  rgba(255,255,255,0.1) 70%,
                  transparent)`,
                backdropFilter: "blur(2px)",
                border: "2px solid rgba(255,255,255,0.4)",
                boxShadow: `
                  inset 0 0 30px rgba(255,255,255,0.4),
                  0 0 30px rgba(255,255,255,0.3),
                  0 0 60px rgba(255,255,255,0.2)
                `,
              }}
            />
          ))}
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-12 lg:pt-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-black space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                What You See Is
                <span className="block text-black/90 drop-shadow-md">
                  What You Get
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-black/90 leading-relaxed drop-shadow-md">
                Every product is visually verified before delivery. You approve
                the item before dispatch — no fakes, no surprises.
              </p>
            </div>

            {/* Trust Line */}
            <div className="bg-white backdrop-blur-sm rounded-lg p-4 border border-white/30">
              <p className="text-lg font-semibold text-black drop-shadow-sm">
                Your payment is held securely until you approve your order.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-white/30 backdrop-blur-sm text-white hover:bg-white/30 text-lg px-8 py-6 font-semibold transition-all hover:scale-105 border-none"
                >
                  Shop Now
                </Button>
              </Link>
              <ScrollLink
                to="how-it-works"
                smooth={true}
                duration={500}
                offset={-80}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-6 font-semibold transition-all hover:scale-105 bg-transparent"
                >
                  How It Works
                </Button>
              </ScrollLink>
            </div>

            {/* Trust Strip */}
            <div className="grid sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Eye className="w-5 h-5 font-bold text-white" />
                <span className="font-bold">Verified by You</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Shield className="w-5 h-5 font-bold text-white" />
                <span className="font-bold">Escrow Protected</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Lock className="w-5 h-5 font-bold text-white" />
                <span className="font-bold">You're in Control</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative animate-scale-in">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border border-white/30">
              <div className="aspect-square bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={sneakerImages[selectedImage] || "/placeholder.svg"}
                  alt="Jordan 1 Chicago"
                  className="w-full h-full object-cover"
                />
              </div>
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1">
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
                        ? "border-green-500 scale-105"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Verification image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-green-600 mt-2 font-semibold">
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
