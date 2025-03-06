import { Link } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
} from "@/modules/Buyer/features/cart/cartSlice";
import { FaEllipsisV, FaShoppingCart, FaTrash } from "react-icons/fa";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface Product {
  size?: any;
  _id: string;
  images: string;
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

  const handleAddToCart = (e: React.MouseEvent) => {
    // prevent default navigation
    e.preventDefault();

    dispatch(
      addToCart({
        _id: product._id,
        brand: product.brand,
        price: product.price,
        quantity: 1,
        images: product.images,
        // color: product,
        // size: product,
        model: product.model,
        storeName: product.storeName,
        // productName: undefined,
      })
    );
  };
  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(removeFromCart(product._id));
  };

  return (
    <div className='relative w-fit'>
      {/* Link to Product Details */}
      <Link
        to={type === "cart" ? "" : `/dashboard/buyer/product/${product?._id}`}
        className='block w-fit'
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
            {type == "cart" ? (
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
            )}

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
        <button
          onClick={handleAddToCart}
          className='absolute top-2 right-2 bg-green-500 p-2 rounded-full shadow-md z-10'
          aria-label='Add to cart'
        >
          <FaShoppingCart className='text-white' size={20} />
        </button>
      )}
    </div>
  );
};

export default ProductSkeleton;
