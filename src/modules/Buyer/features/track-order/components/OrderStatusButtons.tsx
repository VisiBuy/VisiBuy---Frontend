import { TOrderStatus } from "../../../../../types/status";

export type FilterStatus = TOrderStatus | "all";

interface OrderStatusButtonsProps {
  currentStatus: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  className?: string;
  statusCounts: Record<FilterStatus, number>;
}

const statuses: FilterStatus[] = [
  "all",
  "accepted",
  "dispatched",
  "pending",
  "delivered",
  "cancelled",
];

const OrderStatusButtons: React.FC<OrderStatusButtonsProps> = ({
  currentStatus,
  onStatusChange,
  className,
  statusCounts
}) => {
  return (
    <div className={`flex gap-2 flex-wrap ${className || ""}`}>
      {statuses.map((status) => {
        const displayLabel = `${
          status === "all"
            ? "All"
            : status.charAt(0).toUpperCase() + status.slice(1)
        } (${statusCounts[status] || 0})`;

        return (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={` 
              px-2 py-2 text-lg md:px-4 md:py-2 md:text-xl /* Smaller on small screens */
              rounded-md font-bold font-Montserrat
              ${
                currentStatus === status
                  ? "bg-blue-200 text-blue"
                  : "bg-light-gray text-light-gray-600"
              } 
              hover:bg-blue-200 hover:text-blue transition-colors`}
          >
            {displayLabel}
          </button>
        );
      })}
    </div>
  );
};

export default OrderStatusButtons;
