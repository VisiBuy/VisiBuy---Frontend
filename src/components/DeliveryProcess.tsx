

const DeliveryProcess = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">Your Order Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience transparency and trust at every step of your delivery process
          </p>
        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl mx-auto">
          {/* Seller Card */}
          <div className="group relative overflow-hidden aspect-[4/5] cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 to-blue-700/90 transition-all duration-500 group-hover:from-blue-600/95 group-hover:to-blue-800/95">
              <img
                src="src/assets/home/seller-workspace.jpg"
                alt="Seller workspace"
                className="w-full h-full object-cover mix-blend-overlay"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">1</span>
                </div>
              </div>
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 tracking-wide">SELLER</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Verified sellers prepare your order with detailed photo documentation
                </p>
                <div className="w-12 h-12 border-2 border-white/50 rounded-full flex items-center justify-center group-hover:border-white transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Rider Card */}
          <div className="group relative overflow-hidden aspect-[4/5] cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90 transition-all duration-500 group-hover:from-blue-700/95 group-hover:to-blue-900/95">
              <img
                src="src/assets/home/delivery-rider.jpg"
                alt="Delivery rider"
                className="w-full h-full -rotate-360  object-cover mix-blend-overlay"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">2</span>
                </div>
              </div>
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 tracking-wide">RIDER</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Professional delivery riders ensure safe and timely transport
                </p>
                <div className="w-12 h-12 border-2 border-white/50 rounded-full flex items-center justify-center group-hover:border-white transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Card */}
          <div className="group relative overflow-hidden aspect-[4/5] cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700/90 to-blue-900/90 transition-all duration-500 group-hover:from-blue-800/95 group-hover:to-blue-950/95">
              <img
                src="src/assets/home/happy-customer.jpg"
                alt="Happy customer"
                className="w-full h-full object-cover mix-blend-overlay"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">3</span>
                </div>
              </div>
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 tracking-wide">YOU</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Receive your verified order exactly as shown in photos
                </p>
                <div className="w-12 h-12 border-2 border-white/50 rounded-full flex items-center justify-center group-hover:border-white transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Message */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-10 max-w-3xl mx-auto border border-blue-100 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-6">Protected Every Step of the Way</h4>
              <p className="text-lg text-gray-600 leading-relaxed">
                Your payment is held securely until you approve your delivery. Track your order in real-time and verify
                before accepting with complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeliveryProcess
