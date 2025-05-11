import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { Outlet, useLocation } from "react-router-dom";
<<<<<<< HEAD
import { getOrderHistory } from "@/modules/Buyer/models/track-order/trackOrderSlice";
=======
import { getOrderHistory } from "@/modules/Buyer/models/trackOrderSlice";
>>>>>>> staging
import OrderStatusButtons from "@/modules/Buyer/features/track-order/components/OrderStatusButtons";
import SearchOrder from "@/modules/Buyer/features/track-order/components/SearchOrder";
import OrderCard from "@/modules/Buyer/features/track-order/components/OrderCard";
import useOrderActions from "@/modules/Buyer/hooks/useOrderActions";
import useOrderFilter from "@/modules/Buyer/hooks/useOrderFilter";
import LoadingSpinner from "@/ui/LoadingSpinner";
import { FilterStatus } from "@/modules/Buyer/features/track-order/components/OrderStatusButtons";
import ErrorBoundary from "@/common/components/ErrorBoundary";

const ORDERS_PER_PAGE = 10;

const BuyerTrackOrderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { allOrders, loading, error } = useSelector(
    (state: RootState) => state.trackOrder
  );

  const { statusFilter, searchQuery, handleStatusChange, handleSearch } =
    useOrderActions();

  const filteredOrders = useOrderFilter(
    allOrders ?? [],
    statusFilter,
    searchQuery
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  const isViewingOrder = location.pathname.includes("/track-order/view/");

  const validStatuses: FilterStatus[] = [
    "all",
    "accepted",
    "dispatched",
    "pending",
    "delivered",
    "cancelled",
  ];

  const statusCounts: Record<FilterStatus, number> = {
    all: allOrders?.length ?? 0,
    accepted: 0,
    dispatched: 0,
    pending: 0,
    delivered: 0,
    cancelled: 0,
  };

  (allOrders ?? []).forEach((order) => {
    const status = order.order_status?.toLowerCase() as FilterStatus;
    if (validStatuses.includes(status)) {
      statusCounts[status] += 1;
    }
  });

  return (
    <ErrorBoundary>
<<<<<<< HEAD
      <div className="flex flex-col gap-12 p-10">
=======
      <div className='flex flex-col gap-12 p-10'>
>>>>>>> staging
        {isViewingOrder ? (
          <Outlet />
        ) : (
          <>
<<<<<<< HEAD
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 w-full">
=======
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 w-full'>
>>>>>>> staging
                <OrderStatusButtons
                  currentStatus={statusFilter}
                  onStatusChange={handleStatusChange}
                  statusCounts={statusCounts}
<<<<<<< HEAD
                  className="flex-1 whitespace-nowrap overflow-x-auto"
=======
                  className='flex-1 whitespace-nowrap overflow-x-auto'
>>>>>>> staging
                />
              </div>
              <SearchOrder
                onSearch={handleSearch}
<<<<<<< HEAD
                className="w-full sm:w-auto"
              />
            </div>

            <div className="flex gap-24">
              <div className="flex-1 flex flex-col gap-4">
                {loading ? (
                  <div className="flex justify-center items-center min-h-[300px]">
                    <LoadingSpinner isLoading={true} size="large" />
                  </div>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
=======
                className='w-full sm:w-auto'
              />
            </div>

            <div className='flex gap-24'>
              <div className='flex-1 flex flex-col gap-4'>
                {loading ? (
                  <div className='flex justify-center items-center min-h-[300px]'>
                    <LoadingSpinner isLoading={true} size='large' />
                  </div>
                ) : error ? (
                  <p className='text-red-500'>{error}</p>
                ) : allOrders.length === 0 ? (
                  <p>No orders yet.</p>
>>>>>>> staging
                ) : paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <OrderCard key={order.orderId} order={order} />
                  ))
                ) : (
<<<<<<< HEAD
                  <p>No orders found.</p>
                )}
              </div>
              <div className="w-96 hidden lg:block">
=======
                  <p>No orders found for the current filter or search.</p>
                )}
              </div>
              <div className='w-96 hidden lg:block'>
>>>>>>> staging
                {/* Optional: PurchasingHistory */}
              </div>
            </div>

            {!loading && filteredOrders.length > 10 && (
<<<<<<< HEAD
              <div className="flex justify-center mt-4 gap-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-4 py-2 button-text rounded disabled:opacity-50"
=======
              <div className='flex justify-center mt-4 gap-4'>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className='px-4 py-2 button-text rounded disabled:opacity-50'
>>>>>>> staging
                >
                  Previous
                </button>

<<<<<<< HEAD
                <span className="font-OpenSans font-bold text-blue text-xl">
=======
                <span className='font-OpenSans font-bold text-blue text-xl'>
>>>>>>> staging
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
<<<<<<< HEAD
                  className="px-4 py-2 button-text rounded disabled:opacity-50"
=======
                  className='px-4 py-2 button-text rounded disabled:opacity-50'
>>>>>>> staging
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default BuyerTrackOrderPage;
