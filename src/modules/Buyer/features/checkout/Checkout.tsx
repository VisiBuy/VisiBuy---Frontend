import { useEffect, useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
<<<<<<< HEAD
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import OrderConfirmation from "../pop-up/OrderConfirmation";
import { useNavigate, useParams } from "react-router-dom";
=======
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import OrderConfirmation from "../pop-up/OrderConfirmation";
import { useNavigate, useParams } from "react-router-dom";
import { removeFromCart } from "../cart/cartSlice";
import {fetchBuyerInfo} from "../../lib/track-order/api"
import { useQuery } from "@tanstack/react-query";
>>>>>>> staging

interface CartItem {
  _id: string;
  brand: string;
  model: string;
  price: number;
  quantity: number;
  images: string[];
  color?: string;
  size?: string;
  storeName: string;
}

const Checkout = () => {
<<<<<<< HEAD
  const navigate = useNavigate();

=======
  const { data: buyerInfo, isLoading } = useQuery({
    queryKey: ["buyer-info"],
    queryFn: fetchBuyerInfo,
  });
  /* data:Object
  address:"ife ile, Osun State"
  created_at:"2025-02-11T12:01:55.898Z"
  email:"ojodare73@gmail.com"
  fullName:"Ojo Dare"
  phone:"08100307953"
  role:"buyer"
  __v:0
  _id:"67ab3c3383628619e86f3352" */

  // console.log(buyerInfo, isLoading)
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
>>>>>>> staging
  const { id } = useParams();
  // Get user & cart details from Redux
  const user = useSelector((state: RootState) => state.auth.user);
  const cartProduct = useSelector((state: RootState) => state.buyer.cart.items);

  const [data, setData] = useState<CartItem | null>(null);
  useEffect(() => {
    // Find the product by matching the id with the `id` in the products array
    const foundProduct = cartProduct.find((p) => p._id === id); // Assuming id is a string from the URL
    setData(foundProduct ?? null); // Set the product or null if not found
  }, [id, cartProduct]); // Re-run effect when id or products change

  // console.log(cartProduct);

  // Compute total amount dynamically
  // const totalAmount = cart.items.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );

  // Order state
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    // Generate unique order ID
    // orderId: "VISI-" + Math.floor(100000 + Math.random() * 900000),
    items: { _id: "", model: "", quantity: 1, price: 0 },
    totalAmount: 0, // Default value
    paymentStatus: "Pending",
  });

  // if (!data) return;

  useEffect(() => {
    if (data) {
      setOrderDetails({
        // orderId: "VISI-" + Math.floor(100000 + Math.random() * 900000),
        items: data,
        totalAmount: data.price * (data.quantity ?? 1), // Handle potential undefined quantity
        paymentStatus: "Pending",
      });
    }
  }, [data]);

  // Flutterwave payment config
  const flutterwaveConfig = {
<<<<<<< HEAD
    public_key: "FLWPUBK_TEST-d9c9a5938f9d56e031129288f4f30553-X",
=======
    public_key: import.meta.env.REACT_APP_FLW_PUBLIC_KEY,
>>>>>>> staging
    // process.env.REACT_APP_FLW_PUBLIC_TEST_KEY || "FLWPUBK_TEST-XXXXXXXXX",
    // Unique transaction reference
    tx_ref: "VISIBUY-" + Date.now(),
    amount: orderDetails.totalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
<<<<<<< HEAD
      email: user?.email ?? "default@example.com",
      phone_number: user?.phone ?? "0000000000",
      name: user?.fullName ?? "John Doe",
=======
      email: buyerInfo?.email,
      phone_number: buyerInfo?.phone,
      name: buyerInfo?.fullName,
>>>>>>> staging
    },
    customizations: {
      title: "VisiBuy Order Payment",
      description: `Complete your order payment for ${data?.model}`,
      logo: "/VisiBuy - White.png",
    },
    text: "Pay with Flutterwave!",
    callback: (response: any) => {
      if (response.status === "successful") {
        setOrderDetails((prev) => ({
          ...prev,
          paymentStatus: "Paid",
        }));
        setIsOrderPlaced(true);
        dispatch(removeFromCart(orderDetails.items._id));
      }
      closePaymentModal(); // Close modal after payment
    },
    onClose: () => {
      console.log("Payment modal closed"); // Add this to handle modal close event
    },
  };

  return (
    <div className='p-6 fixed inset-0 bg-black bg-opacity-10 flex flex-col justify-center items-center'>
      <h2 className='text-xl font-semibold'>Complete Your Order</h2>

      <FlutterWaveButton
        {...flutterwaveConfig}
        className='mt-4 bg-green-600 text-white px-4 py-2 rounded-lg'
      />

      <OrderConfirmation
        isOpen={isOrderPlaced}
        onClose={() => {
          setIsOrderPlaced(false);
        }}
        orderDetails={orderDetails}
<<<<<<< HEAD
=======
        userAddress={buyerInfo?.address}
>>>>>>> staging
      />

      <button
        className='text-center text-xl text-white bg-red-400 py-2 px-6 rounded mt-6'
        // onClick={() => navigate("/dashboard/buyer/carts")}
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
    </div>
  );
};

export default Checkout;
