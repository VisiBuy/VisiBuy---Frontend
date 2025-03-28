import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { Outlet, useLocation } from "react-router-dom";
import { getOrderHistory } from "@/modules/Buyer/models/track-order/trackOrderSlice";
import OrderStatusButtons from "@/modules/Buyer/features/track-order/components/OrderStatusButtons";
import SearchOrder from "@/modules/Buyer/features/track-order/components/SearchOrder";
import OrderCard from "@/modules/Buyer/features/track-order/components/OrderCard";
import PurchasingHistory from "@/modules/Buyer/features/track-order/components/PurchasingHistory";
import { TOrderStatus } from "@/types/status";
import { normalizeOrder } from "@/modules/Buyer/lib/track-order/normalizeOrder";

type FilterStatus = TOrderStatus | "all";

const BuyerTrackOrderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { orders, loading, error, pagination } = useSelector(
    (state: RootState) => state.trackOrder
  );

  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Memoize normalized orders
  const normalizedOrders = useMemo(
    () => (Array.isArray(orders) ? orders.map(normalizeOrder) : []),
    [orders]
  );

  // Memoize filtered orders
  const filteredOrders = useMemo(() => {
    return normalizedOrders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" ||
        order.order_status.toLowerCase() === statusFilter.toLowerCase();

      const matchesSearch =
        order.product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNo.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [normalizedOrders, statusFilter, searchQuery]);

  // Fetch orders when page changes
  useEffect(() => {
    dispatch(getOrderHistory({ page: pagination.currentPage }));
  }, [dispatch, pagination.currentPage]);

  const handleStatusChange = (status: FilterStatus) => {
    setStatusFilter(status);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const isViewingOrder = location.pathname.includes("/track-order/view/");

  return (
    <div className="flex flex-col gap-12 p-10">
      {isViewingOrder ? (
        <Outlet />
      ) : (
        <>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 w-full">
              <OrderStatusButtons
                currentStatus={statusFilter}
                onStatusChange={handleStatusChange}
                className="flex-1 whitespace-nowrap overflow-x-auto"
              />
            </div>
            <SearchOrder onSearch={handleSearch} className="w-full sm:w-auto" />
          </div>

          <div className="flex gap-24">
            <div className="flex-1 flex flex-col gap-4">
              {loading ? (
                <p>Loading orders...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
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

          {/* Pagination Controls */}
          {!loading &&
            filteredOrders.length > 0 &&
            pagination.totalPages > 1 && (
              <div className="flex justify-center mt-4 gap-4">
                <button
                  disabled={pagination.currentPage === 1}
                  onClick={() =>
                    dispatch(
                      getOrderHistory({ page: pagination.currentPage - 1 })
                    )
                  }
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <span>
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>

                <button
                  disabled={pagination.currentPage >= pagination.totalPages}
                  onClick={() =>
                    dispatch(
                      getOrderHistory({ page: pagination.currentPage + 1 })
                    )
                  }
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default BuyerTrackOrderPage;
