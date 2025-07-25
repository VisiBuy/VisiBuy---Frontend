import { Button } from "@/ui/Button";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BlogPost = () => {
  return (
    <div className="min-h-screen bg-background">
     

      {/* Article Header */}
      <section className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
              Visibuy is Live: The Safer, Smarter Way to Shop Online
            </h1>

            <div className="flex items-center gap-6 text-black/60 mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>By Emmanuel Worgu</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>June 5, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20 bg-visibuy-blue-light ">
        <div className="container mx-auto px-4 pt-10">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm ">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-black/80 mb-8 leading-relaxed">
                  Welcome to a new era of online shopping. At Visibuy, we
                  believe that trust should be built into every transaction.
                  That's why we've created a platform where you, the buyer, see
                  what you're getting before it leaves the seller.
                </p>

                <p className="text-lg text-black/80 mb-8 leading-relaxed">
                  Our mission is simple: to eliminate the guesswork in online
                  shopping by letting buyers verify their orders before
                  delivery. No more "what I ordered vs. what I got." No more
                  surprises. Just peace of mind, powered by visual verification.
                </p>

                <h2 className="text-3xl font-bold text-black mb-6 mt-12">
                  Why Visibuy?
                </h2>

                <p className="text-lg text-black/80 mb-6 leading-relaxed">
                  Online shopping in Nigeria has grown rapidly, but it
                  still suffers from a fundamental flaw: buyers don't always
                  receive what they paid for. This leads to frustration,
                  returns, and mistrust. We're changing that.
                </p>

                <p className="text-lg text-black/80 mb-8 leading-relaxed">
                  With Visibuy, every item goes through a visual verification
                  process before it's delivered. Buyers receive 5 real photos of
                  the exact item ordered. You can approve, decline, or even
                  request specific details or measurements with Visibuy+.
                </p>

                <p className="text-lg text-black/80 mb-6 leading-relaxed">
                  Visibuy is more than a marketplace. It's a movement toward
                  shopping with confidence, powered by our upcoming Visual
                  Verification Engine (VVE) — currently in development — and
                  supported by the Visibuy Logistics Network (VLN).
                </p>

                <div className="bg-visibuy-blue-light rounded-xl p-6 mb-8">
                  <ul className="space-y-3 text-lg text-black/80">
                    <li>
                      <strong>VVE (coming soon)</strong> will use AI to detect
                      mismatches, confirm authenticity, and log verification IDs
                      on a blockchain.
                    </li>
                    <li>
                      <strong>VLN</strong> connects sellers, delivery riders,
                      and warehousing partners to ensure verified products are
                      accurately delivered.
                    </li>
                  </ul>
                </div>

                <p className="text-xl font-semibold text-black my-8 leading-relaxed">
                  Not just another e-commerce site — it’s Africa’s first verification-first ecosystem for everything you shop online.
                </p>

                <h2 className="text-3xl font-bold text-black mb-6 mt-12">
                  How It Works
                </h2>

                <div className="grid gap-6 mb-8">
                  <div className="flex gap-4">
                    <div className="bg-visibuy-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">
                        Order
                      </h3>
                      <p className="text-lg text-black/80">
                        Choose your item and pay securely
                        (escrow-protected).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-visibuy-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">
                        Verify
                      </h3>
                      <p className="text-lg text-black/80">
                        Seller uploads 5-angle real photos. You review and
                        approve.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-visibuy-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">
                        Deliver
                      </h3>
                      <p className="text-lg text-black/80">
                        Only approved items are delivered. Nothing leaves until
                        you say so.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-black/80 mb-8 leading-relaxed">
                  Explore the{" "}
                  <Link to="/faq" className="text-visibuy-blue hover:underline">
                    FAQ
                  </Link>
                  ,{" "}
                  <Link
                    to="/verification-guide"
                    className="text-visibuy-blue hover:underline"
                  >
                    Visibuy Verification Guide
                  </Link>
                  , and{" "}
                  <Link
                    to="/pricing"
                    className="text-visibuy-blue hover:underline"
                  >
                    Pricing Page
                  </Link>{" "}
                  for all the details on how to get the best experience.
                </p>

                <h2 className="text-3xl font-bold text-black mb-6 mt-12">
                  What Makes Visibuy Different?
                </h2>

                <div className="grid gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <span className="text-lg text-black/80">
                      Visual approval before delivery
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔐</span>
                    <span className="text-lg text-black/80">
                      Escrow payments — you control the release
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚚</span>
                    <span className="text-lg text-black/80">
                      Seamless delivery via VLN
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🧠</span>
                    <span className="text-lg text-black/80">
                      VVE AI verification engine (coming soon)
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-black mb-6 mt-12">
                  For Sellers and Partners
                </h2>

                <p className="text-lg text-black/80 mb-6 leading-relaxed">
                  We're also inviting sellers and logistics partners to
                  join the future of verified e-commerce. Visibuy helps sellers
                  gain customer trust instantly, and offers tools to streamline
                  fulfillment.
                </p>

                <p className="text-lg text-black/80 mb-8 leading-relaxed">
                  If you're a seller, check our{" "}
                  <Link
                    to="/pricing"
                    className="text-visibuy-blue hover:underline"
                  >
                    Pricing Page
                  </Link>{" "}
                  to learn how to get started. If you want to become a VLN
                  Partner,{" "}
                  <a
                    href="https://forms.gle/ifLgp7DjapjBGWcb8"
                    className="text-visibuy-blue hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    apply here
                  </a>
                  .
                </p>

                <h2 className="text-3xl font-bold text-black mb-6 mt-12">
                  What's Next?
                </h2>

                <p className="text-lg text-black/80 mb-6 leading-relaxed">
                  We're now live, with hundreds of users already shopping
                  verified product. As we expand, we'll keep improving VVE,
                  growing the Visibuy Logistics Network, and launching more
                  tools that empower both buyers and sellers.
                </p>

                <p className="text-lg text-black/80 mb-8 leading-relaxed">
                  This is just the beginning. Visibuy is on a mission to
                  redefine trust in online shopping. And we want you on
                  this journey.
                </p>

                <div className="bg-black rounded-2xl p-8 text-center grid grid-col-1 place-items-center gap-y-0">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Start shopping with confidence today.
                  </h3>
                  <Button className="bg-visibuy-green hover:bg-visibuy-green/90 hover:text-white text-white text-lg px-8 py-4 my-4">
                    <Link to="/login">👉 Join Visibuy</Link>
                  </Button>
                  <p className="text-xl font-semibold text-white">
                    What You See Is What You Get.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
