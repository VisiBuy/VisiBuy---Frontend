import { axiosWithAuth } from "@/lib/client";
import { AppDispatch, RootState, store } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../cart/cartSlice";
import { UserActivityTracker } from "@/lib/activity-tracker/user-activity-tracker";
import { facebookTracker } from "@/lib/activity-tracker/facebook-tracker";

interface CartItem {
  _id: string;
  brand: string;
  model: string;
  price: number;
  quantity: number;
  images: string[];
  storeName: any;
  color?: string;
  size?: string;
}

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    // orderId: string;
    items: {
      _id: string;
      model: string;
      quantity: number;
      price: number;
    };
    totalAmount: number;
    paymentStatus: string;
  };

  userAddress: string;

}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  isOpen,
  onClose,
  orderDetails,
  userAddress,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartProduct = useSelector((state: RootState) => state.buyer.cart.items);

  const [data, setData] = useState<CartItem | null>(null);
  useEffect(() => {
    // Find the product by matching the id with the `id` in the products array
    const foundProduct = cartProduct.find(
      (p) => p._id === orderDetails.items._id,
    );
    setData(foundProduct ?? null); // Set the product or null if not found
  }, [orderDetails.items._id, cartProduct]);

  if (!isOpen) return null;

  const orderData = {
    sneaker_id: orderDetails.items._id,
    address: userAddress,
    size: data?.size,
    color: data?.color,
    quantity: orderDetails.items.quantity,
  };

  // const sendOrderData = async () => {
  //   const data = await axiosWithAuth.post("order", orderData);
  //   console.log(data);
  // };
  const userActivityTracker = new UserActivityTracker([facebookTracker]);

  const trackPurchaseProducts = (productPurchase: {
    items: any;
    totalAmount: any;
    paymentStatus?: string;
  }) => {
    // console.log(productPurchase);
    userActivityTracker.trackActivity("Purchase", "ProductPurchased", {
      product_id: productPurchase?.items._id,
      product_name: productPurchase?.items.model,
      product_quantity: productPurchase?.items.quantity,
      value: productPurchase?.totalAmount,
      currency: "Naira",
    });
  };


  const sendData = async () => {
    const state = store.getState();
    const token = state.auth.token;

    trackPurchaseProducts(orderDetails);

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    console.log("Response:", data);
    console.log(orderData);
  };

  // sendData();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-2">Order Confirmation</h2>
        <p className="text-gray-600">
          Your order has been placed successfully!
        </p>

        <div className="mt-4">
          {/* <p className='font-semibold'>Order ID: {orderDetails.orderId}</p> */}
          <p className="text-green-600 font-semibold">
            Payment: {orderDetails.paymentStatus}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Order Summary:</h3>
          {/* {orderDetails.items.map((item) => ())} */}
          <div
            key={orderDetails.items._id}
            className="flex justify-between text-sm text-gray-700 border-b py-1"
          >
            <span>
              {orderDetails.items.model} (x{orderDetails.items.quantity})
            </span>
            <span>
              ₦{orderDetails.items.price * orderDetails.items.quantity}
            </span>
          </div>
        </div>

        <div className="mt-4 text-lg font-bold text-green-700">
          Total: ₦{orderDetails.totalAmount}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/buyer/carts");
              sendData();
              dispatch(removeFromCart(orderDetails.items._id));
            }}
            className="mt-4 w-[48%] bg-white-600 text-green-600 py-2 rounded-lg hover:bg-green-300 hover:text-white border-2 border-green-300"
          >
            Back
          </button>
          <button
            onClick={() => {
              // onClose;

              navigate("/dashboard/buyer/track-order");
              // axiosWithAuth.post("order", orderData);
              // sendOrderData();
              sendData();
              dispatch(removeFromCart(orderDetails.items._id));
            }}
            className="mt-4 w-[48%] bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
