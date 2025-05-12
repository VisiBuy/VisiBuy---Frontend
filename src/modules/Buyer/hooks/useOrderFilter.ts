import { useMemo } from "react";
import { normalizeOrder } from "@/modules/Buyer/lib/track-order/normalizeOrder";
import { FilterStatus } from "../features/track-order/components/OrderStatusButtons";

const useOrderFilter = (
  orders: any[],
  statusFilter: FilterStatus,
  searchQuery: string
) => {
  const normalizedOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    return orders.map((order) => normalizeOrder(order)).filter(Boolean); // removes null/undefined after normalization
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const filtered = normalizedOrders.filter((order) => {
      const status = order?.order_status?.toLowerCase?.();
      const matchesStatus =
        statusFilter === "all" || status === statusFilter.toLowerCase();

      const brand = order?.product?.brand?.toLowerCase?.() || "";
      const orderNo = order?.orderNo?.toLowerCase?.() || "";
      const query = searchQuery.trim().toLowerCase();

      const matchesSearch = brand.includes(query) || orderNo.includes(query);

      return matchesStatus && matchesSearch;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.created_at ?? 0);
      const dateB = new Date(b.created_at ?? 0);
      return dateB.getTime() - dateA.getTime(); // Newest first
    });
  }, [normalizedOrders, statusFilter, searchQuery]);

  return filteredOrders;
};

export default useOrderFilter;
