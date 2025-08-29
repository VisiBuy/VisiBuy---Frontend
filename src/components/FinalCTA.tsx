import { useEffect, useState } from "react";
import { ShoppingBag, ShieldCheck, Lock, Phone, Rocket, Flag } from "lucide-react";
import { Button } from "@/ui/Button";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  // Count-up state
  const [orders, setOrders] = useState(0);
  const [approval, setApproval] = useState(0);

  useEffect(() => {
    let startOrders = 0;
    let startApproval = 0;
    const targetOrders = 10000;
    const targetApproval = 99.8;
    const duration = 2000; // 2s animation
    const frameRate = 30; // ~30fps
    const totalFrames = duration / (1000 / frameRate);

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);

      // Ease-out effect for smoother animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setOrders(Math.floor(startOrders + easeOut * targetOrders));
      setApproval(parseFloat((startApproval + easeOut * targetApproval).toFixed(1)));

      if (progress === 1) clearInterval(interval);
    }, 1000 / frameRate);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-black rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-black transform rotate-45"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-black rounded-full animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="mb-8">
            <Flag className="w-12 h-12 text-visibuy-gold mx-auto mb-6" />
            <h2 className="text-5xl lg:text-7xl text-black font-bold mb-6 leading-tight">
              Ready to Shop
              <span className="block text-visibuy-gold">Confidently?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-black opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of Nigerians who've discovered the joy of getting exactly what they ordered.
            </p>
          </div>

          {/* Stats with count-up */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-black rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-visibuy-gold mb-2">
                {orders.toLocaleString()}+
              </div>
              <div className="text-sm opacity-75">Verified Orders</div>
            </div>
            <div className="bg-black rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">{approval}%</div>
              <div className="text-sm opacity-75">Approval Rate</div>
            </div>
            <div className="bg-black rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm opacity-75">Support Available</div>
            </div>
          </div>

          {/* Main CTA */}
          <div className="space-y-6 grid grid-col-1 place-items-center gap-y-0">
            <Button
              size="lg"
              className="bg-visibuy-green text-white hover:text-white hover:bg-visibuy-green/90 text-xl px-12 py-8 font-bold rounded-2xl transform hover:scale-105 transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-6 h-6" />
              <Link to="/login">Start Shopping Now</Link>
            </Button>

            <div className="text-sm text-black flex flex-wrap justify-center gap-6 mt-4">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-visibuy-green" /> No payment to seller until you approve
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-visibuy-green" /> Your money is protected
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-visibuy-green" /> 24/7 support
              </span>
            </div>
          </div>

          {/* Movement Section */}
          <div className="mt-16 rounded-2xl p-8 bg-visibuy-gold animate-fade-in">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              Join the Movement <Rocket className="w-6 h-6" />
            </h3>
            <p className="text-lg text-white opacity-90">
              We're not just changing e-commerce — we're changing how Nigeria shops.
              One verified order at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
