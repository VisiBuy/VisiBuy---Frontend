import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { getOrderHistory } from "@/modules/Buyer/models/track-order/trackOrderSlice";
import OrderStatusButtons from "@/modules/Buyer/features/track-order/components/OrderStatusButtons";
import SearchOrder from "@/modules/Buyer/features/track-order/components/SearchOrder";
import OrderCard from "@/modules/Buyer/features/track-order/components/OrderCard";
import PurchasingHistory from "@/modules/Buyer/features/track-order/components/PurchasingHistory";
import { TOrderStatus } from "@/types/status";

// Import or define the 'Order' interface
import Order  from "@/modules/Buyer/features/track-order/components/OrderCard";
 
type FilterStatus = TOrderStatus | "all";

interface OrderForCard {
  id: string;
  title: string;
  description: string;
  status: TOrderStatus;
  time: string;
}

const transformOrder = (order: Order): OrderForCard => ({
  id: order.orderNumber,
  title: order.sneaker.model,
  description: order.sneaker.brand,
  status: order.order_status,
  time: order.created_at,
});

const BuyerTrackOrderPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.trackOrder
  );

  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("auth-token") || "";

  useEffect(() => {
    dispatch(getOrderHistory(token));
  }, [dispatch, token]);

  const handleStatusChange = (status: FilterStatus) => {
    setStatusFilter(status);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const uiOrders = orders.map(transformOrder);

  const filteredOrders = uiOrders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-12 p-12">
      <div className="flex items-center justify-between">
        <OrderStatusButtons
          currentStatus={statusFilter}
          onStatusChange={handleStatusChange}
        />
        <SearchOrder onSearch={handleSearch} />
      </div>

      {loading && <p>Loading orders...</p>}
      {error && (
        <p className="text-red-500">
          {typeof error === "string" ? error : "Failed to load orders."}
        </p>
      )}

      <div className="flex gap-24">
        <div className="flex-1 flex flex-col gap-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
        <div className="w-96 hidden lg:block">
          <PurchasingHistory />
        </div>
      </div>
    </div>
  );
};

export default BuyerTrackOrderPage;
