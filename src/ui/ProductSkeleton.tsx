import { Link, useNavigate } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
} from "@/modules/Buyer/features/cart/cartSlice";
import { FaEllipsisV, FaShoppingCart, FaTrash } from "react-icons/fa";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { UserActivityTracker } from "@/lib/activity-tracker/user-activity-tracker";
import { facebookTracker } from "@/lib/activity-tracker/facebook-tracker";

interface Product {
  size?: any;
  _id: string;
  images: string[];
  storeName: string;
  storeAvatar?: string;
  model: string;
  brand: string;
  // sizes: number[];
  // color: string[];
  price: number;
}

interface ProductSkeletonProps {
  product: Product;
  type: string;
}

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ product, type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // activity tracking
  const userActivityTracker = new UserActivityTracker([facebookTracker]);
  const trackProductClick = (productClicked: Product) => {
    console.log(productClicked);
    if (type !== "cart") {
      userActivityTracker.trackActivity("ProductView", "Products", {
        content_name: productClicked?.model,
        content_id: productClicked?._id,
      });
    }
  };

  // const handleAddToCart = (e: React.MouseEvent) => {
  //   // prevent default navigation
  //   e.preventDefault();

  //   dispatch(
  //     addToCart({
  //       _id: product._id,
  //       brand: product.brand,
  //       price: product.price,
  //       quantity: 1,
  //       images: product.images,
  //       model: product.model,
  //       storeName: product.storeName,
  //       color: undefined,
  //       sizes: undefined,
  //     })
  //   );
  // };
  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(removeFromCart(product._id));
  };

  if (type === "skeleton") {
    return (
      <div className='relative w-fit animate-pulse'>
        <div className='bg-gray-800 rounded-lg overflow-hidden w-[251px] h-[242px]' />

        <div className='absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end'>
          <div className='flex items-center mb-2'>
            <div className='w-8 h-8 rounded-full bg-gray-600 mr-2' />
            <div className='w-24 h-4 bg-gray-600 rounded' />
          </div>

          <div className='w-3/4 h-5 bg-gray-600 rounded mb-1' />
          <div className='w-1/2 h-4 bg-gray-500 rounded' />
        </div>
      </div>
    );
  }

  return (
    <div className='relative w-fit'>
      {/* Link to Product Details */}
      <Link
        to={type === "cart" ? "" : `/dashboard/buyer/product/${product?._id}`}
        className='block w-fit'
        onClick={(e) => {
          if (type !== "cart") {
            e.preventDefault();
            trackProductClick(product);
            navigate(`/dashboard/buyer/product/${product?._id}`);
          }
        }}
      >
        <div className='relative bg-black text-white rounded-lg overflow-hidden w-fit'>
          {/* Product Image */}
          <img
            src={product?.images[0]}
            alt={product?.model}
            className='w-[251px] h-[242px] object-cover'
          />

          <div className='absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end'>
            {/* Seller Info */}
            {/* {type == "cart" ? (
              ""
            ) : (
              <div className='flex items-center mb-2'>
                <img
                  src={product?.storeAvatar}
                  alt={product?.storeName}
                  className='w-8 h-8 rounded-full mr-2'
                />
                <span className='text-sm text-gray-300'>
                  {product?.storeName}
                </span>
              </div>
            )} */}

            {/* Product Details */}
            <h3 className='text-lg font-semibold'>{product?.model}</h3>
            {/* <p className='text-gray-400 text-sm'>
              Sizes: {product?.sizes.join(", ")}
            </p> */}

            {/* Price */}
            <p className='text-lg font-bold mt-1'>{product?.price} NGN</p>
          </div>
        </div>
      </Link>

      {/* Floating Add to Cart Button (Prevents Navigation) */}
      {type === "cart" ? (
        <>
          {/* Dropdown Toggle */}
          <button
            className='absolute top-2 right-2 p-2 bg-green-600 rounded-full'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label='More options'
          >
            <FaEllipsisV className='text-white' size={20} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className='absolute top-10 right-2 bg-white text-black shadow-lg rounded-md py-1 w-32'>
              <Link
                className='w-full text-left px-4 py-2 text-green-500 hover:bg-gray-200 flex items-center gap-2'
                to={`/dashboard/buyer/carts/summary/${product._id}`}
              >
                Checkout
              </Link>

              <button
                className='w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 flex items-center gap-2'
                onClick={handleRemoveFromCart}
              >
                <FaTrash /> Delete
              </button>
            </div>
          )}
        </>
      ) : (
        // <button
        //   onClick={handleAddToCart}
        //   className='absolute top-2 right-2 bg-green-500 p-2 rounded-full shadow-md z-10'
        //   aria-label='Add to cart'
        // >
        //   <FaShoppingCart className='text-white' size={20} />
        // </button>
        ""
      )}
    </div>
  );
};

export default ProductSkeleton;
