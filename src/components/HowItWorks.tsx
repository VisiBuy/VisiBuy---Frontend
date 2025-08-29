import React from "react";

import { ShoppingCart, Camera, CheckCircle, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: ShoppingCart,
      title: "Place Your Order",
      description:
        "Choose your verified fashion item and complete payment through our secure escrow system.",
    },
    {
      icon: Camera,
      title: "Seller Uploads Real Photos",
      description:
        "Seller takes 5 detailed photos/videos of your exact item for verification.",
    },
    {
      icon: CheckCircle,
      title: "You Approve or Decline",
      description:
        "Review the real photos and approve if satisfied, or decline for a full refund.",
    },
    {
      icon: Truck,
      title: "Verified Product Delivered",
      description:
        "Only after your approval, our trusted rider delivers your verified item.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="how-it-works">
      <div className="container  border-blue mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-visibuy-black mb-4">
            How It Works
          </h2>
          <p className="text-xl text-visibuy-black/70 mb-6 leading-tight">
            Buy → Verify → Deliver — That's how trust works at Visibuy.
          </p>
          <div className="inline-block bg-visibuy-primary text-visibuy-white px-6 py-2 rounded-full font-semibold">
            The Verification Advantage
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Step 1 - Large Horizontal Card */}
          <div className="lg:col-span-2 bg-blue rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div
                  className={`w-32 h-32 ${steps[0]} rounded-2xl flex items-center justify-center`}
                >
                  {React.createElement(steps[0].icon, {
                    className: "w-40 h-40 text-white",
                  })}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <span className="text-lg font-bold text-visibuy-black">
                    1
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-visibuy-black mb-3">
                  {steps[0].title}
                </h3>
                <p className="text-visibuy-black/70 leading-relaxed">
                  {steps[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="text-center">
              <div
                className={`w-24 h-24 ${steps[1]} rounded-2xl flex items-center justify-center mx-auto mb-6`}
              >
                {React.createElement(steps[1].icon, {
                  className: "w-40 h-40 text-black",
                })}
              </div>
              <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center mb-4 mx-auto">
                <span className="text-lg font-bold text-visibuy-black">2</span>
              </div>
              <h3 className="text-xl font-bold text-visibuy-black mb-3">
                {steps[1].title}
              </h3>
              <p className="text-visibuy-black/70 text-sm leading-relaxed">
                {steps[1].description}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="text-center">
              <div
                className={`w-24 h-24 ${steps[2]} rounded-2xl flex items-center justify-center mx-auto mb-6`}
              >
                {React.createElement(steps[2].icon, {
                  className: "w-40 h-40 text-black",
                })}
              </div>
              <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center mb-4 mx-auto">
                <span className="text-lg font-bold text-visibuy-black">3</span>
              </div>
              <h3 className="text-xl font-bold text-visibuy-black mb-3">
                {steps[2].title}
              </h3>
              <p className="text-visibuy-black/70 text-sm leading-relaxed">
                {steps[2].description}
              </p>
            </div>
          </div>

          {/* Step 4 - Large Horizontal Card */}
          <div className="lg:col-span-2 bg-blue rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div
                  className={`w-32 h-32 ${steps[3]} rounded-2xl flex items-center justify-center`}
                >
                  {React.createElement(steps[3].icon, {
                    className: "w-40 h-40 text-white",
                  })}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <span className="text-lg font-bold text-visibuy-black">
                    4
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-visibuy-black mb-3">
                  {steps[3].title}
                </h3>
                <p className="text-visibuy-black/70 leading-relaxed">
                  {steps[3].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
