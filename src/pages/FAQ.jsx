import { Button } from "@/ui/Button";
import { useState } from "react";
import {
  ChevronDown,
  MessageCircle,
  Mail,
  Search,
  ShoppingBag,
  Users,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      category: "🔍 GENERAL",
      icon: <Search className="w-6 h-6" />,
      faqs: [
        {
          question: "What is Visibuy?",
          answer:
            "Visibuy is a fashion-focused e-commerce platform where buyers can visually verify their orders before delivery. It connects buyers, sellers, and riders to create a more trustworthy online shopping experience. Visibuy is a marketplace built around visual trust — we don't just list products, we let buyers verify every transaction.",
        },
        {
          question: "How does Visibuy work?",
          answer:
            "After placing an order, the seller uploads 5-angle photos of the actual item. The buyer receives a notification, reviews the images, and either approves or cancels the item. If approved, the order is delivered.",
        },
        {
          question: "What is VVE (Visual Verification Engine)?",
          answer:
            "VVE is Visibuy's proprietary AI system that powers product verification. It uses computer vision to detect mismatches, identify fakes, and ensure what the seller uploads matches known benchmarks. VVE logs every verification ID on a tamper-proof blockchain for trust and traceability. Coming Soon!",
        },
        {
          question: "What makes Visibuy different from Jumia or Jiji?",
          answer:
            "On Visibuy, you see real photos of the exact item before it's shipped. No more surprises, no scams, no pressure on delivery.",
        },
        {
          question: "Where is Visibuy available?",
          answer: "Currently available in Nigeria.",
        },
        {
          question: "Is Visibuy the same as AR or VR shopping?",
          answer:
            "No — Visibuy is not an Augmented Reality (AR) or Virtual Reality (VR) platform. Unlike AR or VR experiences that use digital simulations, Visibuy is based on real-world images and videos of the actual item you're buying. Every photo is taken by the seller or our warehouse team to show you the exact product before it's delivered. Our focus is authenticity, not simulation — what you see is what you get.",
        },
      ],
    },
    {
      category: "🛍 FOR BUYERS",
      icon: <ShoppingBag className="w-6 h-6" />,
      faqs: [
        {
          question: "When do I pay?",
          answer:
            "You pay at the time of order, but your money is held in escrow. It's only released after you approve the item during visual verification.",
        },
        {
          question: "What is visual verification?",
          answer:
            "It's the process of checking 5 real photos of the item (before delivery) to confirm it matches what you ordered.",
        },
        {
          question: "What if I reject the item?",
          answer:
            "If you decline the item after reviewing the photos, the order is cancelled and your payment is refunded.",
        },
        {
          question: "Can I request specific angles or details?",
          answer:
            "Yes. With Visibuy+, you can request extra photos, size measurements, or zoomed-in details.",
        },
        {
          question: "How long does verification take?",
          answer: `Verification on Visibuy is structured for speed without compromising accuracy: 
            Sellers have up to 6 hours to upload verification photos or videos after an order is placed. 
            Buyers have up to 6 hours to review and approve (or reject) the item once verification content is uploaded. 
            ⏳ Our system is designed to self-optimize over time, reducing these timeframes as we learn from real usage — so future verification can happen even faster, with more precision. 
            ⚠️ If the seller fails to upload verification within 6 hours, the order is automatically cancelled and the buyer receives a full refund. 
            ⚠️ If the buyer does not respond within 6 hours, the order is automatically approved and dispatched as verified.`,
        },
        {
          question: "What if the seller doesn't provide good photos?",
          answer:
            "The seller is prompted to re-upload clear and compliant photos before the order proceeds.",
        },
        {
          question: "Can I change my mind after I approve the item?",
          answer:
            "No. Once you approve the item through visual verification, the seller is paid and the order is dispatched. See our Refund Policy.",
        },
        {
          question: "Is it safe to shop on Visibuy?",
          answer:
            "Yes. Your payment is protected by escrow, and the visual verification process ensures you only receive what you approved.",
        },
        {
          question:
            "Do buyers have to verify every product before it’s delivered?",
          answer: `Not necessarily.<br/>

As Visibuy evolves and our Visual Verification Engine (VVE) gets smarter, buyers won’t always need to manually approve every order. <br/>

Instead, you’ll be able to set your preferences — whether you care more about the product’s size, color, brand tag, or overall condition — and VVE will handle the verification on your behalf.<br/>

You’ll still receive a visual proof of the product (photos or video), but with AI and automation, you can shop with less back-and-forth and more peace of mind.<br/>

In short: <br/>
You stay in control — but you won’t always need to be hands-on.`,
        },
      ],
    },
    {
      category: "🧑‍💼 FOR SELLERS",
      icon: <Users className="w-6 h-6" />,
      faqs: [
        {
          question:
            "What if I'm a dropshipper and don't have access to the product?",
          answer:
            "No problem. Visibuy offers warehousing and logistics through the VLN (Visibuy Logistics Network), allowing products to be sent to a VLN facility for verification and delivery. This enables dropshippers and remote sellers to still meet our visual verification standards. 👉 Visit our Pricing Page to select the seller plan that fits your needs.",
        },
        {
          question: "How do I list a product?",
          answer:
            "Once your seller account is approved, you can upload your product with price and details. After a buyer places an order, you'll be asked to upload 5-angle verification photos.",
        },
        {
          question: "What are the photo requirements?",
          answer:
            "Sellers must upload 5 clear product photos: Side View, Top-down, Sole or base, Logo/branding, Close-up of texture or material. More details are available in the Visibuy Fashion Verification Guide.",
        },
        {
          question: "What if a buyer declines my product?",
          answer:
            "The order is cancelled, and you won't be paid. You're free to relist the item or revise your images.",
        },
        {
          question: "When do I get paid?",
          answer:
            "You are paid 14 days after a buyer approves the item — allowing time for delivery confirmation. Visibuy+ sellers get faster payout time.",
        },
      ],
    },
    {
      category: "🚚 DELIVERY & LOGISTICS",
      icon: <Truck className="w-6 h-6" />,
      faqs: [
        {
          question: "What is the Visibuy Logistics Network (VLN)?",
          answer: `The Visibuy Logistics Network (VLN) is a visual verification cloud infrastructure that seamlessly connects sellers, warehousing partners, and logistics providers to ensure every product sold on Visibuy is authenticated, verified, and traceable — even when sellers do not have physical access to inventory. 
            VLN enables: Warehousing personnel to capture standardized product visuals on behalf of sellers. 
            Logistics agents to securely deliver only verified items using QR/NFC protocols. 
            Sellers to meet Visibuy's verification standards without owning stock. 
            Through this connected network, VLN enforces Visibuy's promise of trust, accuracy, and transparency in every order.`,
        },
        {
          question: "Who handles delivery and warehousing?",
          answer:
            "Visibuy works with vetted delivery partners and select storage hubs.",
        },
        {
          question:
            "Can I become a delivery or warehousing partner in the VLN?",
          answer: `Yes. You can apply to become a VLN partner using <a class="underline via-visibuy-blue"  href='https://forms.gle/ifLgp7DjapjBGWcb8'>click here</a>. However, the network is currently in private beta and available by invitation only. We will reach out to you when ready to deploy VLN in your facility.`,
        },
        {
          question: "Can I track my delivery or stored item?",
          answer:
            "Yes. Buyers and sellers receive tracking updates when an item is dispatched. In future updates, warehouse tracking and inventory visibility will also be introduced.",
        },
        {
          question: "How is VLN different from regular logistics services?",
          answer:
            "VLN goes beyond simple delivery. It links visual verification to a controlled delivery and warehousing flow. Each item is verified, stored (if needed), and delivered under strict protocols to ensure accuracy and trust.",
        },
        {
          question:
            "How do VLN partners confirm they're delivering or storing the right item?",
          answer:
            "Partners use QR codes, tracking numbers, or in-app tools to confirm that the verified product matches what was approved by the buyer, whether in storage or transit.",
        },
        {
          question: "What happens if there's a logistics or warehousing issue?",
          answer:
            "If a buyer reports a mismatch or delay, our system flags the incident. Visual verification data, warehouse records, and delivery confirmations are reviewed to resolve it fairly and efficiently.",
        },
      ],
    },
    {
      category: "💬 SUPPORT",
      icon: <MessageCircle className="w-6 h-6" />,
      faqs: [
        {
          question: "How do I contact support?",
          answer:
            "You can reach us via the in-app chat or by email at tech@visibuy.com.ng.",
        },
        {
          question: "I have an issue with my order. What should I do?",
          answer:
            'Use the "Report Issue" button within your order page. Our support team will respond within 24 hours.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6">
              VISIBUY <span className="text-visibuy-blue">FAQ PAGE</span>
            </h1>
            <p className="text-xl text-black/70 mb-8">
              Helping you shop and sell with confidence through visual
              verification.
            </p>
            <div className="bg-visibuy-blue-light rounded-2xl p-6">
              <p className="text-lg text-black/80">
                Everything you need to know about shopping safely with VisiBuy's
                visual verification system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-visibuy-blue-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  {category.icon}
                  <h2 className="text-3xl font-bold text-black">
                    {category.category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    return (
                      <div
                        key={faqIndex}
                        className="border border-visibuy-gray rounded-2xl overflow-hidden bg-white"
                      >
                        <button
                          className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-visibuy-blue-light transition-colors"
                          onClick={() =>
                            setOpenIndex(
                              openIndex === globalIndex ? null : globalIndex,
                            )
                          }
                        >
                          <span className="font-semibold text-black text-lg pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-black transition-transform flex-shrink-0 ${
                              openIndex === globalIndex ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openIndex === globalIndex && (
                          <div className="px-6 pb-6 text-black/80 leading-relaxed animate-fade-in whitespace-pre-line">
                            <div
                              dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Need More Help?
            </h2>
            <p className="text-xl text-black/70 mb-12">
              Have more questions? Our support team and resources are here to
              help you succeed on Visibuy.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-visibuy-blue-light rounded-2xl p-8">
                <MessageCircle className="w-12 h-12 text-visibuy-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-black mb-4">
                  Contact Support
                </h3>
                <p className="text-black/70 mb-6">
                  Reach us via in-app chat or email at tech@visibuy.com.ng for
                  immediate assistance.
                </p>
                <Button className="bg-visibuy-green hover:bg-visibuy-green/90 text-white w-full">
                  Contact Support
                </Button>
              </div>

              <div className="bg-visibuy-blue-light rounded-2xl p-8">
                <Search className="w-12 h-12 text-visibuy-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-black mb-4">
                  Verification Guide
                </h3>
                <p className="text-black/70 mb-6">
                  Need help with photo uploads? View our step-by-step
                  verification guide.
                </p>
                <Button className="bg-visibuy-green hover:bg-visibuy-green/90 text-white w-full">
                  View Guide
                </Button>
              </div>
            </div>

            <div className="bg-black rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Experience Visual Shopping?
              </h3>
              <p className="text-white/80 mb-6">
                Join the future of e-commerce where you see exactly what you're
                buying before it arrives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-visibuy-green hover:bg-visibuy-green/90 text-white text-lg px-8 py-4">
                  <Link to="/login"> Start Shopping</Link>
                </Button>
                <Button className="bg-visibuy-blue hover:bg-visibuy-blue/90 text-white text-lg px-8 py-4">
                  <Link to="/signup"> Become a Seller</Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 text-sm text-black/60">
              <p>
                🧭 Need help with photo uploads? View the{" "}
                <span className="text-visibuy-blue font-semibold">
                  Visibuy Fashion Verification Guide
                </span>{" "}
                for step-by-step instructions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
