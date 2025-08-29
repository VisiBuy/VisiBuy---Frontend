import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { Link } from "react-router-dom";
import { useGetPublicProducts } from "@/modules/Seller/queries/product/queries";
import { Spinner } from "@/common/components/spinner";
import { formatCurrency } from "@/lib/utils";

// Lucide icons
import { Flame, CheckCircle2, Camera, Clock } from "lucide-react";

const SneakerDrop = () => {
  const { data, error, isError, isLoading } = useGetPublicProducts({
    page: 1,
    pageSize: 6,
  });

  if (isError) {
    return (
      <section className="py-20 bg-white text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              This Week's{" "}
              <span className="text-visibuy-gold">Verified Drop</span>
            </h2>
            <p className="text-xl opacity-90 my-6">
              Exclusive, Limited, and 100% Verified — Get them before they're
              gone.
            </p>
            <Badge className="bg-visibuy-gold text-black px-4 py-2 text-sm animate-pulse flex items-center gap-1">
              <Flame className="w-4 h-4" /> Limited Time Offers
            </Badge>
          </div>
          <div className="text-white text-xl">An error occurred</div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              This Week's{" "}
              <span className="text-visibuy-gold">Verified Drop</span>
            </h2>
            <p className="text-xl opacity-90 my-6">
              Exclusive, Limited, and 100% Verified — Get them before they're
              gone.
            </p>
            <Badge className="bg-visibuy-gold text-black px-4 py-2 text-sm animate-pulse flex items-center gap-1">
              <Flame className="w-4 h-4" /> Limited Time Offers
            </Badge>
          </div>
          <Spinner />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-blue text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            This Week's <span className="text-visibuy-gold">Verified Drop</span>
          </h2>
          <p className="text-xl opacity-90 my-6 leading-tight">
            Exclusive, Limited, and 100% Verified — Get them before they're
            gone.
          </p>
          <Badge className="bg-visibuy-gold text-black px-4 py-2 text-sm animate-pulse  gap-1">
            <Flame className="w-4 h-4" /> Limited Time Offers
          </Badge>

          {/* Sneakers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 mt-8">
            {data &&
              data.data.length > 0 &&
              data.data.map((sneaker, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative">
                    <Badge className="absolute -top-2 -right-2 bg-visibuy-green text-white text-xs z-10 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </Badge>

                    <div
                      className="aspect-square bg-visibuy-gray rounded-xl mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform bg-no-repeat bg-cover"
                      style={{
                        backgroundImage: `url(${(sneaker.images && sneaker.images[0]) || ""})`,
                      }}
                    ></div>
                  </div>

                  <h3 className="font-bold text-lg mb-2 text-left">
                    {sneaker.brand}
                  </h3>

                  <div className="flex items-center gap-2 my-2">
                    <span className="text-xl font-bold text-white">
                      {formatCurrency(sneaker.price, true, "₦", 0)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Example if you bring back countdown */}
                    {/* <Badge
                      variant="outline"
                      className="text-white border-white flex items-center gap-1"
                    >
                      <Clock className="w-3 h-3" /> {sneaker.timeLeft} left
                    </Badge> */}

                    <span className="text-xs flex items-center gap-1 text-white">
                      <Camera className="w-3 h-3" /> 5 photos verified
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-visibuy-green text-white hover:bg-visibuy-green/90 hover:text-white/80 text-lg px-8 py-6 font-semibold"
            >
              <Link to="/login"> See All Verified Sneakers</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SneakerDrop;
