import { Shield, Eye, Ban, Truck } from "lucide-react";

const WhyVisibuy = () => {
  const features = [
    {
      icon: Eye,
      title: "See Before Delivery",
      description: "Real product photos sent to you before dispatch",
      color: "text-visibuy-blue",
    },
    {
      icon: Ban,
      title: "No More Disappointments",
      description: "End the 'What I Ordered vs What I Got' nightmare",
      color: "text-visibuy-gold",
    },
    {
      icon: Shield,
      title: "Only Verified Listings",
      description: "Every seller verified, every product authentic",
      color: "text-visibuy-green",
    },
    {
      icon: Truck,
      title: "Trusted Rider Network",
      description: "Real-time delivery updates and GPS tracking",
      color: "text-visibuy-black",
    },
  ];

  return (
    <section className="py-20 bg-visibuy-blue-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-visibuy-black mb-4">
            Why <span className="text-visibuy-blue">Visibuy</span>?
          </h2>
          <p className="text-xl text-visibuy-black/70 max-w-2xl mx-auto leading-relaxed">
            Trust in Every Pixel — We're changing how Nigeria shops online, one
            verified order at a time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-visibuy-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105"
            >
              <div
                className={`w-16 h-16 ${feature.color.replace("text-", "bg-")}/10 rounded-full flex items-center justify-center mb-6 mx-auto`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>

              <h3 className="text-xl font-bold text-visibuy-black mb-3">
                {feature.title}
              </h3>
              <p className="text-visibuy-black/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* VVE Section */}
        <div className="mt-20 bg-gradient-to-r from-visibuy-blue to-visibuy-black rounded-3xl p-8 lg:p-12 text-visibuy-white text-center">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            Powered by <span className="text-visibuy-gold">VVE</span>
          </h3>
          <p className="text-xl mb-8 opacity-90">Visual Verification Engine</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="bg-visibuy-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🤖</div>
              <div className="font-semibold">AI + Computer Vision</div>
            </div>
            <div className="bg-visibuy-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📷</div>
              <div className="font-semibold">Real-time Photo Verification</div>
            </div>
            <div className="bg-visibuy-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🧠</div>
              <div className="font-semibold">Buyer Approval Layer</div>
            </div>
            <div className="bg-visibuy-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">💾</div>
              <div className="font-semibold">Blockchain Logs</div>
              <div className="text-xs opacity-75 mt-1">(Coming Soon)</div>
            </div>
          </div>

          <p className="mt-8 text-lg opacity-90 max-w-2xl leading-tight mx-auto">
          VVE is Visibuy’s proprietary AI-powered system for product verification. It uses advanced computer vision to detect mismatches, flag counterfeit items, and ensure that seller-uploaded images match verified standards. Each verification is logged with a unique ID on a tamper-proof blockchain, ensuring trust, traceability, and accountability. (Coming Soon)
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyVisibuy;
