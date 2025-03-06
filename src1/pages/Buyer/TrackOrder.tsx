import { useEffect, useState } from "react";
import { Outlet, useOutlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderStatusButtons from "../../modules/Buyer/features/track-order/components/OrderStatusButtons";
import SearchOrder from "../../modules/Buyer/features/track-order/components/SearchOrder";
import OrderCard from "../../modules/Buyer/features/track-order/components/OrderCard";
import PurchasingHistory from "../../modules/Buyer/features/track-order/components/PurchasingHistory";
import { RootState, AppDispatch } from "../../store/store";
import { getOrderHistory } from "../../modules/Buyer/models/track-order/trackOrderSlice";
import { TOrderStatus } from "../../types/status";

type FilterStatus = TOrderStatus | "all";

// Define the API order shape (as returned by your API)
interface OrderFromAPI {
  sneaker: {
    brand: string;
    model: string;
    price: string;
  };
  order_status: TOrderStatus;
  buyer: {
    fullName: string;
  };
  orderNumber: string;
  invoiceID: string;
  Size: string;
  Color: string;
  created_at: string;
}

// Define the UI order shape expected by OrderCard
interface OrderForCard {
  id: string;
  title: string;
  description: string;
  status: TOrderStatus;
  time: string;
}

const transformOrder = (order: OrderFromAPI): OrderForCard => ({
  id: order.orderNumber,
  title: order.sneaker.model, // Using sneaker model as the title
  description: order.sneaker.brand, // Using sneaker brand as the description
  status: order.order_status,
  time: order.created_at,
});

const BuyerTrackOrderPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // orders here are in the API shape from your Redux slice
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.trackOrder
  );

  // Transform API orders into UI orders
  const [uiOrders, setUiOrders] = useState<OrderForCard[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderForCard[]>([]);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Use mock data (no API fetch)
  // Assuming token is stored locally (or from Redux)
  const token = localStorage.getItem("auth-token") || "";

  // Fetch order history on mount
  useEffect(() => {
    dispatch(getOrderHistory(token));
  }, [dispatch, token]);

  // Transform orders whenever orders change
  useEffect(() => {
    const transformed = (orders as OrderFromAPI[]).map(transformOrder);
    setUiOrders(transformed);
    setFilteredOrders(transformed);
  }, [orders]);

  // Filter orders based on status and search query
  useEffect(() => {
    let updated = [...orders];
    if (statusFilter !== "all") {
      updated = updated.filter((order) => order.status === statusFilter);
    }
    if (searchQuery.trim()) {
      updated = updated.filter(
        (order) =>
          order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredOrders(updated);
  }, [uiOrders, statusFilter, searchQuery]);

  const handleStatusChange = (status: FilterStatus) => {
    setStatusFilter(status);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // useOutlet returns the element for a child route if it exists
  const outlet = useOutlet();

  return (
    <div className='flex flex-col gap-12 p-12'>
      {!outlet ? (
        <>
          {/* Row 1: OrderStatusButtons + SearchOrder */}
          <div className='flex items-center justify-between'>
            <OrderStatusButtons
              currentStatus={statusFilter}
              onStatusChange={handleStatusChange}
            />
            <SearchOrder onSearch={handleSearch} />
          </div>

          {/* Row 2: OrderCards + PurchasingHistory */}
          <div className='flex gap-12'>
            <div className='flex-1 flex flex-col gap-4'>
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
            <div className='w-64 hidden lg:block'>
              <PurchasingHistory />
            </div>
          </div>
        </>
      ) : (
        // When a child route (OrderDetailsPage) is active, render it and hide the controls.
        <div>{outlet}</div>
      )}
    </div>
  );
};

export default BuyerTrackOrderPage;
