import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { getOrderHistory } from "@/modules/Buyer/models/track-order/trackOrderSlice";
import OrderStatusButtons from "@/modules/Buyer/features/track-order/components/OrderStatusButtons";
import SearchOrder from "@/modules/Buyer/features/track-order/components/SearchOrder";
import OrderCard from "@/modules/Buyer/features/track-order/components/OrderCard";
import PurchasingHistory from "@/modules/Buyer/features/track-order/components/PurchasingHistory";
import { TOrderStatus } from "@/types/status";
import { Order } from "@/types/orders";

type FilterStatus = TOrderStatus | "all";

const BuyerTrackOrderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.trackOrder
  );

  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  const handleStatusChange = (status: FilterStatus) => {
    setStatusFilter(status);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Ensure orders exist before filtering
  if (!Array.isArray(orders)) {
    console.error("⚠️ Orders is not an array:", orders);
  }

  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order: Order) => {
        const matchesStatus =
          statusFilter === "all" || order.order_status?.toLowerCase() === statusFilter.toLowerCase();
        const matchesSearch =
          order.product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.orderId?.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesStatus && matchesSearch;
      })
    : [];


  return (
    <div className="flex flex-col gap-12 p-12">
      <div className="flex items-center justify-between">
        <OrderStatusButtons
          currentStatus={statusFilter}
          onStatusChange={handleStatusChange}
        />
        <SearchOrder onSearch={handleSearch} />
      </div>

      {/* Unified loading, error, and content handling */}
      <div className="flex gap-24">
        <div className="flex-1 flex flex-col gap-4">
          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order: Order) => (
              <OrderCard key={order.orderId} order={order} />
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
        <div className="w-96 hidden lg:block">
          <PurchasingHistory />
        </div>
      </div>
    </div>
  );
};

export default BuyerTrackOrderPage;
