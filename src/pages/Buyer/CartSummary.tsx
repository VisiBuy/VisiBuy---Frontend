import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/ui/Button";
import CartSummaryItem from "./CartSummaryItem";
import {
  calculateTotals,
  selectCartSummary,
} from "@/modules/Buyer/features/cart/cartSummarySlice";
import { Link, useNavigate, useParams } from "react-router-dom";

interface CartItem {
  _id: string;
  brand: string;
  model: string;
  price: number;
  quantity: number;
  images: string[];
  color?: string;
  sizes?: string;
  storeName: string;
}

const CartSummary = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();

  const cartItems = useSelector((state: RootState) => state.buyer.cart.items);
  const { subtotal, deliveryFee, vat, total } = useSelector(selectCartSummary);

  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);

  // const products = useSelector(
  //   (state: RootState) => state.buyer.product.products
  // );
  const [data, setData] = useState<CartItem | null>(null);

  useEffect(() => {
    // Find the product by matching the id with the `id` in the products array
    const foundProduct = cartItems.find((p) => p._id === id); // Assuming id is a string from the URL
    setData(foundProduct ?? null); // Set the product or null if not found
  }, [id, cartItems]); // Re-run effect when id or products change

  // Recalculate totals whenever the cart changes
  useEffect(() => {
    if (data) {
      dispatch(calculateTotals(data));
    }
  }, [data, dispatch]);

  // if (!data)
  //   return (
  //     <div className='max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg'>
  //       <h2 className='text-lg md:text-xl font-semibold mb-4'>Cart Summary</h2>
  //       <p className='text-gray-500 text-center'>Your cart is empty.</p>
  //     </div>
  //   );

  if (!data)
    return (
      <div>
        <h2 className='mb-4 text-3xl font-bold font-montserrat'>
          Cart Summary
        </h2>
        <div className='max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg'>
          <p className='text-gray-500 text-center'>Your cart is empty.</p>
        </div>
      </div>
    );

  return (
    <div>
      <h2 className='mb-4 text-3xl font-bold font-montserrat'>Cart Summary</h2>
      <div className='max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg'>
        {/* Cart Items */}
        <div className='space-y-4'>
          {/* {data > 0 ? (
          data.map((item) => )
        ) : (
          <p className='text-gray-500 text-center'>Your cart is empty.</p>
        )} */}

          <CartSummaryItem key={data._id} item={data} />
        </div>

        {/* Delivery Details */}
        <div className='mt-4'>
          <button
            onClick={() => setShowDeliveryDetails(!showDeliveryDetails)}
            className='text-sm font-medium flex items-center gap-2'
          >
            {showDeliveryDetails
              ? "▼ Hide Delivery Details"
              : "▶ Add Delivery Details"}
          </button>

          {showDeliveryDetails && (
            <div className='mt-2 space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span>Delivery</span>
                <span>₦{deliveryFee.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>VAT</span>
                <span>₦{vat.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className='mt-4 border-t pt-4 text-sm'>
          <div className='flex justify-between'>
            <span>Sub Total</span>
            <span>₦{subtotal.toFixed(2)}</span>
          </div>
          <div className='flex justify-between font-semibold text-lg'>
            <span>Total</span>
            <span>₦{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className='mt-4 flex justify-between'>
          <Button
            variant='outline'
            onClick={() => history(-1)}
            className='w-1/2 mr-2'
          >
            Cancel
          </Button>
          <Link
            className='w-1/2  rounded'
            to={`/dashboard/buyer/carts/checkout/${data._id}`}
          >
            <Button className='w-full' variant='default'>
              Pay Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
