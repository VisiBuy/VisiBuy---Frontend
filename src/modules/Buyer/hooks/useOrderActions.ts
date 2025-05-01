import { useState } from "react";
import { FilterStatus } from "../features/track-order/components/OrderStatusButtons";


const useOrderActions = () => {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusChange = (status: FilterStatus) => {
    setStatusFilter(status);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return {
    statusFilter,
    searchQuery,
    handleStatusChange,
    handleSearch,
  };
};

export default useOrderActions;
