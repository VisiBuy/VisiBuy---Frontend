import React from "react";
import { Link } from "react-router-dom";
import { TOrderStatus } from "../../../../../types/status";
import { statusToClassName } from "../../../lib/track-order/utils";

interface Order {
  id: string;
  title: string;
  description: string;
  status: TOrderStatus;
  time: string;
}

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  // Relative URL: "view/:orderId"
  const detailsUrl = `view/${order.id}`;

  return (
    <Link to={detailsUrl} className='block'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-md p-6 rounded-md hover:bg-gray-50 transition-colors'>
        <div>
          <h2 className='font-bold text-gray-800'>Order #{order.id}</h2>
          <p className='text-sm text-gray-600 mt-1'>{order.description}</p>
        </div>
        <div className='flex flex-col sm:items-end mt-2 sm:mt-0'>
          <span
            className={`text-sm font-semibold px-2 py-1 rounded-md inline-block ${statusToClassName(
              order.status
            )}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
          <span className='text-xs text-gray-400 mt-1'>{order.time}</span>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
