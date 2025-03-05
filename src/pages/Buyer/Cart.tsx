import ProductSkeleton from "@/ui/ProductSkeleton";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.buyer.cart.items);

  return (
    <div>
      <h2 className='text-3xl font-bold'>Cart</h2>
      {cartItems.length === 0 ? (
        <div className='text-6xl h-[70vh] w-[100%] flex items-center justify-center text-gray-300'>
          Cart is empty
        </div>
      ) : null}
      {cartItems.map((item) => (
        <div
          key={item._id}
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'
        >
          <ProductSkeleton type='cart' product={item} />
          {/* <h3>{item.name}</h3>
          <p>
            {item.price} NGN x {item.quantity}
          </p>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button> */}
        </div>
      ))}
    </div>
  );
};

export default Cart;
