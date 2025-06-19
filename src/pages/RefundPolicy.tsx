import { Button } from "@/ui/Button";
import { CheckCircle, Clock, Shield } from "lucide-react";

const RefundPolicy = () => {
  const refundReasons = [
    {
      icon: CheckCircle,
      title: "Item Doesn't Match Photos",
      description:
        "If the delivered item differs from the approved verification photos, you get a full refund immediately.",
    },
    {
      icon: Shield,
      title: "Quality Issues",
      description:
        "Items with defects not visible in verification photos are eligible for full refunds.",
    },
    {
      icon: Clock,
      title: "Delivery Issues",
      description:
        "Late delivery or failure to deliver results in automatic refund processing.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6">
              Refund <span className="text-visibuy-blue">Policy</span>
            </h1>
            <p className="text-xl text-black/70 mb-8">
              Your money is protected with our comprehensive refund guarantee.
            </p>
            <div className="bg-visibuy-green/10 rounded-2xl p-6 border border-visibuy-green/20">
              <p className="text-lg text-black font-semibold">
                100% Money-Back Guarantee - No Questions Asked
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Refund Reasons */}
      <section className="py-20 bg-visibuy-blue-light">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                When You Get a Full Refund
              </h2>
              <p className="text-xl text-black/70">
                We believe in complete transparency and customer protection
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {refundReasons.map((reason, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center"
                >
                  <div className="bg-visibuy-green/10 rounded-2xl p-6 mb-6 inline-block">
                    <reason.icon className="w-8 h-8 text-visibuy-green" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">
                    {reason.title}
                  </h3>
                  <p className="text-black/70 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Policy Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* How Refunds Work */}
            <div className="bg-visibuy-blue-light rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-black mb-6">
                How Our Refund Process Works
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-visibuy-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">
                      Payment Protection
                    </h3>
                    <p className="text-black/80">
                      Your money is held safely in escrow until you approve the
                      verification photos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-visibuy-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">
                      Verification Stage
                    </h3>
                    <p className="text-black/80">
                      If you're not satisfied with the photos, we don't ship and
                      you get a full refund.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-visibuy-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">
                      Post-Delivery Protection
                    </h3>
                    <p className="text-black/80">
                      If the delivered item doesn't match approved photos, we
                      provide immediate refunds.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Timeline */}
            <div className="bg-white border border-visibuy-gray rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-black mb-6">
                Refund Timeline
              </h2>
              <div className="space-y-4 text-black/80">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-black mb-3">
                      Pre-Delivery Refunds
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Instant refund if photos are rejected</li>
                      <li>Immediate processing for order cancellations</li>
                      <li>No waiting period required</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-3">
                      Post-Delivery Refunds
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>24-48 hours for refund approval</li>
                      <li>3-5 business days for processing</li>
                      <li>Same payment method as original purchase</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Not Covered */}
            <div className="bg-white border border-visibuy-gray rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-black mb-6">
                What's Not Covered
              </h2>
              <div className="space-y-4 text-black/80">
                <p>Our refund policy doesn't cover:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Change of mind after approving verification photos</li>
                  <li>Damage caused by misuse after delivery</li>
                  <li>
                    Items that match the approved verification photos exactly
                  </li>
                  <li>
                    Custom or personalized items (unless they don't match
                    specifications)
                  </li>
                </ul>
                <p className="mt-4 font-medium">
                  However, we're always willing to work with you to find a
                  solution that makes you happy!
                </p>
              </div>
            </div>

            {/* How to Request a Refund */}
            <div className="bg-visibuy-green/10 rounded-2xl p-8 border border-visibuy-green/20">
              <h2 className="text-3xl font-bold text-black mb-6">
                How to Request a Refund
              </h2>
              <div className="space-y-4 text-black/80">
                <p>Getting a refund is simple:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contact our support team via WhatsApp or email</li>
                  <li>Provide your order number and reason for refund</li>
                  <li>Our team will review and process your request</li>
                  <li>Receive confirmation and refund timeline</li>
                </ol>
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="font-semibold text-black">
                    Contact Information:
                  </p>
                  <p>WhatsApp: +234 (0) 123 456 7890</p>
                  <p>Email: refunds@visibuy.com</p>
                  <p>Available 24/7 for immediate assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Shop Risk-Free Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              With our comprehensive refund policy, you can shop with complete
              confidence knowing your money is always protected.
            </p>
            <Button className="bg-visibuy-green hover:bg-visibuy-green/90 text-white text-lg px-8 py-6 rounded-2xl">
              Start Shopping Safely
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
