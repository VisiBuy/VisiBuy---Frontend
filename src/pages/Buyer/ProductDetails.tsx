import {
  addToCart,
  updateQuantity,
} from "@/modules/Buyer/features/cart/cartSlice";
import { RootState } from "@/store/store";
import OrderSuccess from "@/ui/buyer/OrderSuccess";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface Product {
  _id: string;
  brand: string;
  model: string;
  description: string;
  images: string;
  storeName: string;
  storeAvatar: string;
  size?: number[];
  price: number;
  color?: string[];
  quantity: number;
}

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const products = useSelector(
    (state: RootState) => state.buyer.product.products
  );
  const cartItems = useSelector((state: RootState) => state.buyer.cart.items);

  const [data, setData] = useState<Product | null>(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // Get product quantity in cart
  const cartItem = cartItems.find((item) => item._id === id);
  const quantity = cartItem ? cartItem.quantity : 1;

  useEffect(() => {
    // Find the product by matching the id with the `id` in the products array
    const foundProduct = products.find((p) => p._id === id); // Assuming id is a string from the URL
    setData(foundProduct ?? null); // Set the product or null if not found
  }, [id, products]); // Re-run effect when id or products change

  const handleOrderSuccess = () => {
    if (!data) return;
    dispatch(addToCart(data));
    setShowOrderSuccess(true);
  };
  const handleAddToQuantity = () => {
    if (!data) return;
    dispatch(updateQuantity({ id: data?._id, quantity: quantity - 1 }));
  };
  const handleMinusToQuantity = () => {
    if (!data) return;
    dispatch(updateQuantity({ id: data?._id, quantity: quantity + 1 }));
  };

  return (
    <div className='h-[100%] w-[90%] p-8'>
      {showOrderSuccess && (
        <OrderSuccess onClose={() => setShowOrderSuccess(false)} />
      )}

      <div className='flex flex-col  py-8 text-xl gap-8'>
        {/* title */}
        <h2 className='font-semibold uppercase text-2xl'>{data?.model}</h2>

        {/* image */}
        <div className='h-[263px] flex justify-center'>
          {data?.images && (
            <img
              src={data.images[0]}
              alt={data.model}
              className='w-[75%] h-[80%]'
            />
          )}
        </div>

        {/* color and sizes */}
        <div className='flex gap-8'>
          {data?.color && data.color.length > 0 && (
            <div>
              <label htmlFor='color'>Color</label>
              <br />
              <select
                id='color'
                className='min-w-[130px] h-12 border-2 border-gray-400 rounded'
              >
                {data.color.map((col, index) => (
                  <option key={index} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          )}
          {data?.size && data.size.length > 0 && (
            <div>
              <label htmlFor='size'>Size</label>
              <br />
              <select
                id='size'
                className='min-w-[130px] h-12 border-2 border-gray-400 rounded'
              >
                {data.size.map((sz, index) => (
                  <option key={index} value={sz}>
                    {sz}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Quantity and Order Actions */}
        <div className='md:w-md'>
          <label htmlFor=''>Amount</label>
          <div className='flex items-center text-center gap-4 rounded h-12 mt-6 font-bold text-2xl'>
            <button
              onClick={handleAddToQuantity}
              className={`p-2 px-4 rounded-full cursor-pointer flex items-center ${
                quantity > 1 ? "bg-green-400" : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={quantity <= 1}
            >
              -
            </button>

            <span className='px-4 w-[150px] h-full flex items-center justify-center border-2'>
              {quantity}
            </span>

            <button
              onClick={handleMinusToQuantity}
              className='px-4 bg-green-400 rounded-full cursor-pointer h-full flex items-center'
            >
              +
            </button>
          </div>
          <p className='mt-4'>{data?.description}</p>
          <div className='flex gap-2 md:gap-4'>
            <button
              className='w-[264px] h-12 mt-6 px-2 md:px-6 font-semibold rounded-md bg-green-600 text-white cursor-pointer hover:bg-green-400'
              onClick={handleOrderSuccess}
              type='submit'
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

// 1
// :
// brand
// :
// "Nike"
// color
// :
// Array(1)
// 0
// :
// "yellow"
// length
// :
// 1
// [[Prototype]]
// :
// Array(0)
// description
// :
// "The Nike Dunk Low is a popular model known for its versatile design and comfortable fit. This colorway features a striking combination of yellow, black, and gray, making it stand out as a stylish option"
// images
// :
// Array(0)
// length
// :
// 0
// [[Prototype]]
// :
// Array(0)
// model
// :
// "Nike Dunk Low"
// price
// :
// 115
// seller
// :
// time
// :
// "2024-11-07T11:11:15.978Z"
// user_id
// :
// "672c9e3034132d7052ee1e35"
// [[Prototype]]
// :
// Object
// size
// :
// Array(1)
// 0
// :
// "32"
// length
// :
// 1
// [[Prototype]]
// :
// Array(0)
// stock_status
// :
// "in_stock"
// __v
// :
// 0
// _id
// :
// "672ca05c4e08718f982d1ede"
// [[Prototype]]
// :
// Object
