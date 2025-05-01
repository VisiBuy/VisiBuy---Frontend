import { useMemo } from "react";
import { normalizeOrder } from "@/modules/Buyer/lib/track-order/normalizeOrder";
import { FilterStatus } from "../features/track-order/components/OrderStatusButtons";

const useOrderFilter = (
  orders: any[],
  statusFilter: FilterStatus,
  searchQuery: string
) => {
  const normalizedOrders = useMemo(
    () => (Array.isArray(orders) ? orders.map(normalizeOrder) : []),
    [orders]
  );

  const filteredOrders = useMemo(() => {
    const filtered = normalizedOrders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" ||
        order.order_status.toLowerCase() === statusFilter.toLowerCase();

      const matchesSearch =
        order.product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNo.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });

    

    return filtered.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime(); // Newest first
    });
  }, [normalizedOrders, statusFilter, searchQuery]);

  return filteredOrders;
  
};



export default useOrderFilter;
