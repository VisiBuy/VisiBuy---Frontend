import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  X,
  Info,
  Package,
  Users,
  Clock,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/Dialog";

const FeatureModal = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-visibuy-green">{title}</DialogTitle>
      </DialogHeader>
      <p className="text-visibuy-dark-gray">{description}</p>
    </DialogContent>
  </Dialog>
);
const Pricing = () => {
  const [activeTab, setActiveTab] = useState<"sellers" | "buyers">("sellers");

  const sellerFeatures = [
    { name: "Listing Fee", free: "Free", plus: "Free" },
    {
      name: "Commission + Gateway Fee",
      free: "10% + 2.5%",
      plus: "10% + 2.5%",
    },
    { name: "Payout Time", free: "14 days", plus: "7 days" },
    {
      name: "Visual Verification",
      free: "Manual upload only",
      plus: "Manual + warehouse-assisted",
    },
    { name: "Remote Seller Support", free: false, plus: true },
    { name: "Branded Storefront URL", free: false, plus: true },
    { name: "Visibility & Boosts", free: false, plus: true },
    { name: "Advanced Tools", free: false, plus: true },
    { name: "VLN Warehouse Access", free: false, plus: true },
    {
      name: "Support",
      free: "Standard",
      plus: "Priority onboarding & chat support",
    },
  ];

  const buyerFeatures = [
    {
      name: "Product Price",
      free: "Pay only for what you approve",
      plus: "Same",
    },
    { name: "Photo Verification", free: true, plus: true },
    { name: "Escrow Protection", free: true, plus: true },
    { name: "Video Verification", free: false, plus: true },
    { name: "Request Additional Photos", free: false, plus: true },
    { name: "Request Size Measurements", free: false, plus: true },
    { name: "Early Access to Drops", free: false, plus: true },
    { name: "Verified Shopper Badge", free: false, plus: true },
    { name: "Priority Support", free: false, plus: true },
    { name: "Early Access to New Tools", free: false, plus: true },
  ];

  const faqs = [
    {
      question: "What's the difference between Visibuy and Visibuy+?",
      answer:
        "Visibuy is our free plan for buyers and sellers. Visibuy+ adds extra perks like early drop access, faster payouts, warehousing support, and custom storefronts.",
    },
    {
      question:
        "If I'm a seller without physical access to my product (e.g., dropshipping), can I still use Visibuy?",
      answer:
        "Yes! With Visibuy+, our warehouse personnel can take verification photos on your behalf.",
    },
    {
      question: "How does the payout system work for sellers?",
      answer:
        "Free plan users receive payout 14 days after delivery. Visibuy+ sellers get paid in 7 days.",
    },
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer:
        "Yes. You can switch between Free and Visibuy+ anytime from your dashboard.",
    },
    {
      question: "What is VLN (Visibuy Logistics Network)?",
      answer:
        "VLN connects sellers to verified warehousing and logistics support. Visibuy+ sellers enjoy discounted access.",
    },
  ];

  const FeatureModal = ({
    title,
    description,
    children,
  }: {
    title: string;
    description: string;
    children: React.ReactNode;
  }) => (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-visibuy-green">{title}</DialogTitle>
        </DialogHeader>
        <p className="text-visibuy-dark-gray">{description}</p>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-visibuy-light-shade">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-visibuy-green via-visibuy-green to-visibuy-primary">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-2xl lg:text-6xl font-bold mb-6 leading-relaxed">
              Fair Pricing. Full Confidence.
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              One platform. Two plans. Total control.
            </p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-sm">
                <div className="w-16 h-16 bg-visibuy-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Happy Buyers</h3>
                <p className="text-sm opacity-80">Verify before you buy</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-sm">
                <div className="w-16 h-16 bg-visibuy-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Confident Sellers
                </h3>
                <p className="text-sm opacity-80">Grow with transparency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-visibuy-light-shade rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab("sellers")}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeTab === "sellers"
                    ? "bg-visibuy-green text-white"
                    : "text-visibuy-dark-gray hover:text-visibuy-green"
                }`}
              >
                For Sellers
              </button>
              <button
                onClick={() => setActiveTab("buyers")}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeTab === "buyers"
                    ? "bg-visibuy-green text-white"
                    : "text-visibuy-dark-gray hover:text-visibuy-green"
                }`}
              >
                For Buyers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seller Pricing */}
      {activeTab === "sellers" && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-visibuy-dark-gray mb-4">
                Seller Pricing Plans
              </h2>
              <p className="text-xl text-visibuy-dark-gray/70">
                Built for sellers who want to grow with clarity. Zero upfront
                costs. Just value.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white rounded-2xl border-2 border-visibuy-light-shade p-8 relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-visibuy-dark-gray mb-2">
                    Visibuy Free
                  </h3>
                  <div className="text-4xl font-bold text-visibuy-green mb-2">
                    ₦0
                  </div>
                  <p className="text-visibuy-dark-gray/70">
                    Perfect to get started
                  </p>
                </div>

                <div className="space-y-4">
                  {sellerFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-visibuy-dark-gray font-medium">
                        {feature.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {typeof feature.free === "boolean" ? (
                          feature.free ? (
                            <Check className="w-5 h-5 text-visibuy-green" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )
                        ) : (
                          <span className="text-sm text-visibuy-dark-gray/70">
                            {feature.free}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <Button className="w-full bg-visibuy-green hover:bg-visibuy-green/90 text-white">
                    <Link to="/login">📦 Start Selling</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-visibuy-green text-visibuy-green hover:bg-visibuy-green hover:text-white"
                  >
                    <Link to="/verification-guide">📘 Seller Guide</Link>
                  </Button>
                </div>
              </div>

              {/* Plus Plan */}
              <div className="bg-white rounded-2xl border-2 border-visibuy-green p-8 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-visibuy-primary">
                  Beta Special
                </Badge>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-visibuy-dark-gray mb-2">
                    Visibuy+
                  </h3>
                  <div className="text-4xl font-bold text-visibuy-green mb-1">
                    ₦20,000
                  </div>
                  <div className="text-sm text-visibuy-dark-gray/70 line-through">
                    ₦30,000 at launch
                  </div>
                  <p className="text-visibuy-dark-gray/70 mt-2">
                    Save ₦10,000/month during beta
                  </p>
                </div>

                <div className="space-y-4">
                  {sellerFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-visibuy-dark-gray font-medium">
                        {feature.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {typeof feature.plus === "boolean" ? (
                          feature.plus ? (
                            <Check className="w-5 h-5 text-visibuy-green" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )
                        ) : (
                          <span className="text-sm text-visibuy-dark-gray/70">
                            {feature.plus}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <Button
                    disabled
                    className="w-full bg-visibuy-green hover:bg-visibuy-green/90 text-white"
                  >
                    🚀 Coming Soon
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-visibuy-green text-visibuy-green hover:bg-visibuy-green hover:text-white"
                  >
                    <Link to="/verification-guide">📘 Seller Guide</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Buyer Pricing */}
      {activeTab === "buyers" && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-visibuy-dark-gray mb-4">
                Buyer Pricing Plans
              </h2>
              <p className="text-xl text-visibuy-dark-gray/70">
                Perfect for fashion lovers who value control, perks, and early
                access.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white rounded-2xl border-2 border-visibuy-light-shade p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-visibuy-dark-gray mb-2">
                    Visibuy Free
                  </h3>
                  <div className="text-4xl font-bold text-visibuy-green mb-2">
                    ₦0
                  </div>
                  <p className="text-visibuy-dark-gray/70">
                    Essential protection included
                  </p>
                </div>

                <div className="space-y-4">
                  {buyerFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-visibuy-dark-gray font-medium">
                        {feature.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {typeof feature.free === "boolean" ? (
                          feature.free ? (
                            <Check className="w-5 h-5 text-visibuy-green" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )
                        ) : (
                          <span className="text-sm text-visibuy-dark-gray/70">
                            {feature.free}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <Button className="w-full bg-visibuy-green hover:bg-visibuy-green/90 text-white">
                    <Link to="/login"> 🛍 Start Shopping</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-visibuy-green text-visibuy-green hover:bg-visibuy-green hover:text-white"
                  >
                    <Link to="/">👀 How It Works</Link>
                  </Button>
                </div>
              </div>

              {/* Plus Plan */}
              <div className="bg-white rounded-2xl border-2 border-visibuy-green p-8 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-visibuy-primary">
                  Most Popular
                </Badge>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-visibuy-dark-gray mb-2">
                    Visibuy+
                  </h3>
                  <div className="text-4xl font-bold text-visibuy-green mb-1">
                    ₦1,500
                  </div>
                  <p className="text-visibuy-dark-gray/70">per month</p>
                  <p className="text-sm text-visibuy-green mt-2">
                    Save ₦6,000 yearly
                  </p>
                </div>

                <div className="space-y-4">
                  {buyerFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-visibuy-dark-gray font-medium">
                        {feature.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {typeof feature.plus === "boolean" ? (
                          feature.plus ? (
                            <Check className="w-5 h-5 text-visibuy-green" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )
                        ) : (
                          <span className="text-sm text-visibuy-dark-gray/70">
                            {feature.plus}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <Button disabled className="w-full bg-visibuy-green hover:bg-visibuy-green/90 text-white">
                    ⭐ Coming Soon
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-visibuy-green text-visibuy-green hover:bg-visibuy-green hover:text-white"
                  >
                  <Link to="/">👀 How It Works</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feature Modals Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-visibuy-dark-gray mb-12">
            Key Features Explained
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureModal
              title="Remote Seller Support"
              description="A Visibuy+ benefit that allows warehouse staff to take verification photos for sellers without physical access to inventory. Perfect for dropshippers."
            >
              <div className="bg-visibuy-light-blue-tint rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow">
                <Truck className="w-12 h-12 text-visibuy-green mb-4" />
                <h3 className="font-semibold text-visibuy-dark-gray mb-2">
                  Remote Support
                </h3>
                <p className="text-sm text-visibuy-dark-gray/70">
                  Learn more about warehouse assistance
                </p>
              </div>
            </FeatureModal>

            <FeatureModal
              title="Escrow Protection"
              description="We hold payments until buyers approve the product via verification. Ensures safe delivery and no scams."
            >
              <div className="bg-visibuy-light-blue-tint rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow">
                <Shield className="w-12 h-12 text-visibuy-green mb-4" />
                <h3 className="font-semibold text-visibuy-dark-gray mb-2">
                  Escrow Protection
                </h3>
                <p className="text-sm text-visibuy-dark-gray/70">
                  Your money is safe until approval
                </p>
              </div>
            </FeatureModal>

            <FeatureModal
              title="VLN Access"
              description="Visibuy's integrated network of warehouses and delivery partners, available at a discount to Visibuy+ sellers."
            >
              <div className="bg-visibuy-light-blue-tint rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow">
                <Package className="w-12 h-12 text-visibuy-green mb-4" />
                <h3 className="font-semibold text-visibuy-dark-gray mb-2">
                  VLN Network
                </h3>
                <p className="text-sm text-visibuy-dark-gray/70">
                  Discounted logistics access
                </p>
              </div>
            </FeatureModal>

            <FeatureModal
              title="Verified Shopper Badge"
              description="An optional badge shown on your profile to signal trust. Helps in future resale or limited drops."
            >
              <div className="bg-visibuy-light-blue-tint rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow">
                <Star className="w-12 h-12 text-visibuy-green mb-4" />
                <h3 className="font-semibold text-visibuy-dark-gray mb-2">
                  Verified Badge
                </h3>
                <p className="text-sm text-visibuy-dark-gray/70">
                  Build trust in the community
                </p>
              </div>
            </FeatureModal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-visibuy-light-shade">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-visibuy-dark-gray mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-visibuy-dark-gray mb-3">
                  {faq.question}
                </h3>
                <p className="text-visibuy-dark-gray/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-visibuy-green to-visibuy-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Two plans. Total clarity. Everything is either Free or Visibuy+.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-visibuy-green hover:bg-white/90"
            >
              <Link to="/login"> Start as a Seller</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-visibuy-green"
            >
              <Link to="/login"> Start as a Buyer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
