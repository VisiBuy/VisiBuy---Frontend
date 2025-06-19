import { ShoppingCart, Camera, CheckCircle, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: ShoppingCart,
      title: "Place Your Order",
      description: "Choose your verified fashion item and complete payment through our secure escrow system.",
      color: "bg-visibuy-blue"
    },
    {
      icon: Camera,
      title: "Seller Uploads Real Photos",
      description: "Seller takes 5 detailed photos/videos of your exact item for verification.",
      color: "bg-visibuy-gold"
    },
    {
      icon: CheckCircle,
      title: "You Approve or Decline",
      description: "Review the real photos and approve if satisfied, or decline for a full refund.",
      color: "bg-visibuy-green"
    },
    {
      icon: Truck,
      title: "Verified Product Delivered",
      description: "Only after your approval, our trusted rider delivers your verified item.",
      color: "bg-visibuy-black"
    }
  ];
  
  return (
    <section className="py-20 bg-visibuy-white" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-visibuy-black mb-4">
            How It Works
          </h2>
          <p className="text-xl text-visibuy-black/70 mb-6 leading-tight">
            Buy → Verify → Deliver — That's how trust works at Visibuy.
          </p>
          <div className="inline-block bg-gradient-to-r from-visibuy-blue to-visibuy-gold text-visibuy-white px-6 py-2 rounded-full font-semibold">
            The Verification Advantage
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-visibuy-gray z-0"></div>
              )}
              
              <div className="relative bg-visibuy-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-visibuy-gray group-hover:border-visibuy-blue">
                <div className={`w-16 h-16 ${step.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                  <step.icon className="w-8 h-8 text-visibuy-white" />
                </div>
                
                <div className="text-center">
                  <div className="bg-visibuy-gray rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                    <span className="text-sm font-bold text-visibuy-black">{index + 1}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-visibuy-black mb-2">{step.title}</h3>
                  <p className="text-visibuy-black/70 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;