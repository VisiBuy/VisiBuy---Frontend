import { axiosWithAuth } from "../../../../lib/client";
import { RootState } from "../../../../store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Product {
  size: number[];
  color: string[];
  _id: string;
  brand: string;
  price: number;
  model: string;
  description: string;
  storeName: string;
  storeAvatar: string;
  images?: string;
  quantity: number;
}

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    orderId: string;
    items: {
      _id: string;
      model: string;
      quantity: number;
      price: number;
    };
    totalAmount: number;
    paymentStatus: string;
  };
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  isOpen,
  onClose,
  orderDetails,
}) => {
  const navigate = useNavigate();
  const cartProduct = useSelector(
    (state: RootState) => state.buyer.product.products
  );

  const [data, setData] = useState<Product | null>(null);
  useEffect(() => {
    // Find the product by matching the id with the `id` in the products array
    const foundProduct = cartProduct.find(
      (p) => p._id === orderDetails.items._id
    ); // Assuming id is a string from the URL
    setData(foundProduct ?? null); // Set the product or null if not found
  }, [orderDetails.items._id, cartProduct]);

  if (!isOpen) return null;

  const orderData = {
    sneaker_id: orderDetails.items._id,
    address: "",
    size: data?.size,
    color: data?.color,
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-lg font-semibold mb-2'>Order Confirmation</h2>
        <p className='text-gray-600'>
          Your order has been placed successfully!
        </p>

        <div className='mt-4'>
          <p className='font-semibold'>Order ID: {orderDetails.orderId}</p>
          <p className='text-green-600 font-semibold'>
            Payment: {orderDetails.paymentStatus}
          </p>
        </div>

        <div className='mt-4'>
          <h3 className='font-semibold'>Order Summary:</h3>
          {/* {orderDetails.items.map((item) => ())} */}
          <div
            key={orderDetails.items._id}
            className='flex justify-between text-sm text-gray-700 border-b py-1'
          >
            <span>
              {orderDetails.items.model} (x{orderDetails.items.quantity})
            </span>
            <span>
              ₦{orderDetails.items.price * orderDetails.items.quantity}
            </span>
          </div>
        </div>

        <div className='mt-4 text-lg font-bold text-green-700'>
          Total: ₦{orderDetails.totalAmount}
        </div>

        <button
          onClick={() => {
            // onClose;
            navigate("/dashboard/buyer/track-order");
            axiosWithAuth.post("order", orderData);
          }}
          className='mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
