import { TOrderStatus } from "../../../../../types/status";

type FilterStatus = TOrderStatus | "all";

interface OrderStatusButtonsProps {
  currentStatus: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  className?: string;
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
}) => {
  return (
    <div className={`flex gap-2 flex-wrap ${className || ""}`}>
      {statuses.map((status) => {
        const displayLabel =
          status === "all"
            ? "All"
            : status.charAt(0).toUpperCase() + status.slice(1);

        return (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={` 
              px-1 py-1 text-xs md:px-4 md:py-2 md:text-lg /* Smaller on small screens */
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
