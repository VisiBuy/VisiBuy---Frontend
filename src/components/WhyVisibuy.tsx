import { Shield, Eye, Ban, Truck, Bot, Camera, Brain } from "lucide-react"
import { Link } from "react-router-dom"

const WhyVisibuy = () => {
  const features = [
    {
      icon: Eye,
      title: "See Before Delivery",
      description:
        "Real product photos sent to you before dispatch. No more surprises, just transparency.",
      bg: "bg-visibuy-primary",
    },
    {
      icon: Ban,
      title: "No More Disappointments",
      description:
        "End the 'What I Ordered vs What I Got' nightmare with our verification system.",
      bg: "bg-yellow-400",
    },
    {
      icon: Shield,
      title: "Only Verified Listings",
      description:
        "Every seller verified, every product authentic. Trust built into every transaction.",
      bg: "bg-yellow-500",
    },
    {
      icon: Truck,
      title: "Trusted Rider Network",
      description:
        "Real-time delivery updates and GPS tracking for complete peace of mind.",
      bg: "bg-blue",
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 lg:mb-20">
          {/* Left Text */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              WHY{" "}
              <span className="px-3 sm:px-4 py-1 bg-blue text-white rounded-md">
                VISIBUY
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
              We're revolutionizing online shopping in Nigeria through
              transparency, verification, and trust. Every order is a promise
              kept, every delivery is exactly what you expected.
            </p>
            <Link
              to="/login"
              className="inline-block bg-blue text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition text-sm sm:text-base"
            >
              SHOP NOW
            </Link>
          </div>

          {/* Right Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-1">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`rounded-2xl p-5 sm:p-6 ${feature.bg} hover:shadow-lg transition`}
              >
                <div className="mb-3 sm:mb-4">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm italic text-white leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Powered by VVE Section */}
        <div className="bg-black rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white">
          <h3 className="text-3xl sm:text-4xl text-center font-bold mb-4">
            Powered by{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue bg-clip-text text-transparent">
              VVE
            </span>
          </h3>
          <p className="text-blue font-bold mb-2 text-center">
            Visual Verification Engine
          </p>
          <p className="text-gray-300 mb-8 max-w-xl text-center mx-auto text-sm sm:text-base">
            Our proprietary AI system ensures every product matches its listing
            through advanced computer vision and human verification layers.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="bg-blue-500/20 p-2 sm:p-3 rounded-xl">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-blue" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base">
                  AI + Computer Vision
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Advanced image analysis
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="bg-blue-500/20 p-2 sm:p-3 rounded-xl">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base">
                  Real-time Verification
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Instant photo validation
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="bg-blue-500/20 p-2 sm:p-3 rounded-xl">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base">
                  Human Approval
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Your final decision matters
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <div className="text-xl sm:text-2xl text-blue font-bold">
              COMING SOON!!!
            </div>
            <div className="font-semibold text-sm sm:text-base">
              Blockchain Integration
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              Immutable verification records
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyVisibuy
