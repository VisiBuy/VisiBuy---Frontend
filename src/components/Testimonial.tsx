const Testimonials = () => {
  const testimonials = [
    {
      name: "Pascal Chidera",
      location: "Lagos",
      avatar: "/review1.jpg",
      quote:
        "VisiBuy is a game changer! The user-friendly interface makes navigation a breeze, and the visual verification feature is a lifesaver. I truly believe this will end the 'what I ordered vs what I got' nightmare. The seamless integration between sellers, buyers, and riders makes the entire process smooth and reliable. It’s clear that VisiBuy is designed to tackle common online shopping issues and bring peace of mind to customers. Highly recommended!",
      rating: 5,
    },
    {
      name: "Choice Homa",
      location: "Port Harcourt",
      avatar: "/review2.jpg",
      quote:
        "VisiBuy’s delivery service really stands out with its visual verification system. It lets customers confirm the condition and contents of their package before it gets to them. This is a big deal, especially for valuable or fragile items, because you’ll know for sure that what you’re getting is exactly what you ordered. No more surprises or disappointments!",
      rating: 5,
    },
    {
      name: "Favour Chika",
      location: "Abuja",
      avatar: "/review3.jpg",
      quote:
        "I recently used Visibuy for my online shopping, and I was really impressed! What I ordered matched exactly what I received—no surprises. I especially loved the personalized feature that allowed me to verify my order before delivery. It gave me peace of mind, especially for my new dress that I was excited about. I highly recommend Visibuy; they truly deliver on their promise!",
      rating: 5,
    },
    // {
    //   name: "Emeka",
    //   location: "Lagos",
    //   avatar: "🧔🏾‍♂️",
    //   quote:
    //     "I no fit believe say dem actually show me real photos before delivery. This na the future!",
    //   rating: 5,
    // },
    // {
    //   name: "Adunni",
    //   location: "Ibadan",
    //   avatar: "👩🏾‍🦱",
    //   quote:
    //     "My Ankara fabric come exactly as I see am for photo. Visibuy don change the game!",
    //   rating: 5,
    // },
    // {
    //   name: "David",
    //   location: "Enugu",
    //   avatar: "👨🏾‍💻",
    //   quote:
    //     "Tech guy wey dey appreciate good innovation. This verification system na next level!",
    //   rating: 5,
    // },
  ];

  return (
    <section className="py-20 bg-visibuy-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-visibuy-black mb-4 leading-tight">
            Real People, Real{" "}
            <span className="text-visibuy-gold">Confidence</span>
          </h2>
          <p className="text-xl text-visibuy-black/70 leading-tight">
            Hear from our verified community across Nigeria 🇳🇬
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-visibuy-blue-light rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12  bg-no-repeat bg-cover rounded-full flex items-center justify-center text-2xl mr-4`}
                  style={{
                    backgroundImage: `url(${testimonial.avatar})`,
                  }}
                ></div>
                <div>
                  <h4 className="font-bold text-visibuy-black">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-visibuy-black/70">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-visibuy-gold text-lg">
                    ⭐
                  </span>
                ))}
              </div>

              <blockquote className="text-visibuy-black/80 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="mt-4 flex items-center text-sm text-visibuy-green">
                <span className="mr-1">✅</span>
                Verified Purchase
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-visibuy-blue-light rounded-full px-6 py-3 shadow-lg">
            <span className="text-3xl mr-3">🎉</span>
            <div className="text-left">
              <div className="font-bold text-visibuy-black">
                10,000+ Happy Customers
              </div>
              <div className="text-sm text-visibuy-black/70">
                Join the verified community
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
