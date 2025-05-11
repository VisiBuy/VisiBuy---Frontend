import ProductSkeleton from "@/ui/ProductSkeleton";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.buyer.cart.items);

  return (
    <>
      <div className=''>
        <h2 className='text-3xl font-bold font-montserrat'>Cart</h2>
        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 p-6'> */}
        <div className='flex gap-6 p-6' style={{ flexWrap: "wrap" }}>
<<<<<<< HEAD
          {cartItems.length === 0 ? (
            <div className='text-6xl h-[70vh] w-[100%] flex items-center justify-center text-gray-300'>
              Cart is empty
            </div>
          ) : null}
          {cartItems.map((item) => (
            <div key={item._id} className='grid grid-rows-[repeat(auto-fit,minmax(200px,1fr))] auto-cols-[251px] justify-center md:flex md:justify-normal gap-6 p-6'
            style={{ flexWrap: "wrap" }}>
              <ProductSkeleton type='cart' product={item} />
            </div>
          ))}
=======
          {/* {cartItems.length === 0 ? (
            <
          ) : null} */}
          {cartItems?.length > 0 ? (
            <div
              className='grid grid-rows-[repeat(auto-fit,minmax(200px,1fr))] auto-cols-[251px] justify-center md:flex md:justify-normal gap-6 p-6'
              style={{ flexWrap: "wrap" }}
            >
              {cartItems.map((item) => (
                <ProductSkeleton key={item._id} type='cart' product={item} />
              ))}
            </div>
          ) : (
            <div className='text-6xl h-[70vh] w-[100%] flex items-center justify-center text-gray-300'>
              Cart is empty
            </div>
          )}
>>>>>>> staging
        </div>
      </div>
    </>
  );
};

export default Cart;
