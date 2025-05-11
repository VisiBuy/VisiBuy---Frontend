import { useQuery } from "@tanstack/react-query";
import { fetchBuyerInfo } from "@/modules/Buyer/lib/track-order/api";

const BuyerAccountPage = () => {
  const { data: buyerInfo, isLoading } = useQuery({
    queryKey: ["buyer-info"],
    queryFn: fetchBuyerInfo,
  });

  if (isLoading)
    return (
      <p className="animate-pulse text-gray-500"></p>
    );

  return (
    <section className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6 transition hover:shadow-lg">
        <h2 className="text-blue font-bold text-lg mb-2">Full Name</h2>
        <p className="text-gray-700">{buyerInfo?.fullName}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 transition hover:shadow-lg">
        <h2 className="text-blue font-bold text-lg mb-2">Email</h2>
        <p className="text-gray-700">{buyerInfo?.email}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 transition hover:shadow-lg">
        <h2 className="text-blue font-bold text-lg mb-2">Phone</h2>
        <p className="text-gray-700">
          {buyerInfo?.phone || "Not provided"}
        </p>
      </div>
    </section>
  );
};

export default BuyerAccountPage;
