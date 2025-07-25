import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "Do I see the product before it's delivered?",
      answer: "Yes! You get 5 real photos/videos of your exact item before dispatch. You must approve these photos before we release the product for delivery."
    },
    {
      question: "What if I don't like what I see?",
      answer: "Simple — we don't deliver, and your money is safe. Our escrow system holds your payment until you approve the verification photos."
    },
    {
      question: "Is this Pay on Delivery?",
      answer: "No, it's even safer. It's Escrow protection — you pay upfront, but seller only gets paid after you approve the verification photos."
    },
    {
      question: "How long does verification take?",
      answer: "Sellers typically upload verification photos within 6 hours. You then have 6 hours to approve or request new photos."
    },
    {
      question: "What if the delivered item doesn't match approved photos?",
      answer: "Full refund, no questions asked. Our riders are trained to verify items match the approved photos before handover."
    },
    {
      question: "Can I request specific angles or details?",
      answer: "Absolutely! You can request additional photos or specific angles during the verification process."
    }
  ];
  
  return (
    <section className="py-20 bg-visibuy-blue-light">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 ">
            <h2 className="text-4xl lg:text-5xl font-bold text-visibuy-black mb-4 leading-tight">
              Still Got <span className="text-visibuy-blue">Questions</span>?
            </h2>
            <p className="text-xl text-visibuy-black/70 leading-tight">
              We've got answers to help you shop with confidence.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-visibuy-gray rounded-2xl overflow-hidden bg-visibuy-white">
                <button
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-visibuy-blue-light transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-visibuy-black text-lg">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-visibuy-black transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 text-visibuy-black/80 leading-relaxed animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-visibuy-blue to-visibuy-gold rounded-2xl p-8 text-visibuy-white">
              <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
              <p className="mb-4 opacity-90">Our support team is here 24/7</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="">
                  
                </button>
                <Link  className="bg-visibuy-white text-visibuy-blue px-6 py-3 rounded-lg font-semibold hover:bg-visibuy-blue-light transition-colors" to="tel:+2348061924490">
                📱 WhatsApp Support
                </Link>
                <Link className="bg-white/20 text-visibuy-white px-6 py-3 rounded-lg font-semibold hover:bg-visibuy-white/30 transition-colors" to="mailto:tech@visibuy.com.ng">
                ✉️ Email Us
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;