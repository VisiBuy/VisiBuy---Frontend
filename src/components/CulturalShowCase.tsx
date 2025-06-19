const CulturalShowcase = () => {
    return (
      <section className="py-20 bg-visibuy-blue-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4 leading-tight">
              Culture Meets <span className="text-visibuy-gold">Confidence</span>
            </h2>
            <p className="text-xl text-black/80 max-w-2xl mx-auto leading-relaxed">
              From Lagos streets to global runways — authentic Nigerian fashion, verified and delivered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Streetwear */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-visibuy-blue p-8 text-white transform hover:scale-105 transition-all duration-500">
                <div className="absolute top-4 right-4">
                  <span className="text-4xl">🔥</span>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-bold mb-2">Streetwear</h3>
                  <p className="text-sm opacity-90">Lagos-inspired urban fashion</p>
                  <div className="mt-4 flex gap-2">
                    <span className="text-2xl">👟</span>
                    <span className="text-2xl">👕</span>
                    <span className="text-2xl">🧢</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Traditional */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-visibuy-green p-8 text-white transform hover:scale-105 transition-all duration-500">
                <div className="absolute top-4 right-4">
                  <span className="text-4xl">👑</span>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-bold mb-2">Traditional</h3>
                  <p className="text-sm opacity-90">Heritage meets modern style</p>
                  <div className="mt-4 flex gap-2">
                    <span className="text-2xl">🥻</span>
                    <span className="text-2xl">👗</span>
                    <span className="text-2xl">🎭</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fusion */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-black p-8 text-white transform hover:scale-105 transition-all duration-500">
                <div className="absolute top-4 right-4">
                  <span className="text-4xl">✨</span>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-bold mb-2">Fusion</h3>
                  <p className="text-sm opacity-90">Where worlds collide</p>
                  <div className="mt-4 flex gap-2">
                    <span className="text-2xl">🌍</span>
                    <span className="text-2xl">💫</span>
                    <span className="text-2xl">🎨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default CulturalShowcase;