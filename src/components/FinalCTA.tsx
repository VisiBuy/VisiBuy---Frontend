import { Button } from "@/ui/Button";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white transform rotate-45"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-20 h-20 border border-white transform rotate-12"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-6xl mb-6 block">🇳🇬</span>
            <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Ready to Shop 
              <span className="block text-visibuy-gold">Confidently?</span>
            </h2>
            <p className="text-xl lg:text-2xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of Nigerians who've discovered the joy of getting exactly what they ordered.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-visibuy-gold mb-2">10,000+</div>
              <div className="text-sm opacity-75">Verified Orders</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">99.8%</div>
              <div className="text-sm opacity-75">Approval Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm opacity-75">Support Available</div>
            </div>
          </div>
          
          {/* Main CTA */}
          <div className="space-y-6 grid grid-col-1 place-items-center gap-y-0">
            <Button size="lg" className="bg-visibuy-green text-white hover:bg-visibuy-green/90 text-xl px-12 py-8 font-bold rounded-2xl transform hover:scale-105 transition-all">
              <Link to="/login">🛍️ Start Shopping Now</Link>
            </Button>
            
            <div className="text-sm opacity-75">
              ✅ No payment to seller until you approve  •  🔒 Your money is protected  •  📱 24/7 support
            </div>
          </div>
          
          {/* Movement Text */}
          <div className="mt-16 bg-visibuy-green rounded-2xl p-8">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Join the Movement 🚀
            </h3>
            <p className="text-lg opacity-90">
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