import { Star, CheckCircle2, Flag, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";

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
        "I no fit believe say dem actually show me real photos before delivery. This na the future!",
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
  ];

  return (
    <section className="py-20 bg-visibuy-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-visibuy-black mb-4 leading-tight">
            Real <span className="text-blue">People</span>, Real{" "}
            <span className="text-visibuy-gold">Confidence</span>
          </h2>
          <p className="text-xl text-visibuy-black/70 leading-tight flex items-center justify-center gap-2">
            Hear from our verified community across Nigeria{" "}
            <Flag className="w-5 h-5 text-green-600" />
          </p>
        </div>

        {/* Infinite scroll testimonials */}
        <motion.div
          className="flex gap-8"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="bg-visibuy-blue min-w-[300px] max-w-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 bg-no-repeat bg-cover rounded-full mr-4"
                  style={{
                    backgroundImage: `url(${testimonial.avatar})`,
                  }}
                ></div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-white">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-visibuy-gold fill-visibuy-gold"
                  />
                ))}
              </div>

              <blockquote className="text-white italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="mt-4 flex items-center text-sm text-white">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Verified Purchase
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-visibuy-primary rounded-full px-6 py-3 shadow-lg">
            <PartyPopper className="w-6 h-6 mr-3 text-yellow-300" />
            <div className="text-left">
              <div className="font-bold text-white">10,000+ Happy Customers</div>
              <div className="text-sm text-white">
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
