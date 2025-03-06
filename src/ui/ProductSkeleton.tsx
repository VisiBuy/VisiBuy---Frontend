import { Link } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
} from "@/modules/Buyer/features/cart/cartSlice";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

interface Product {
  size?: any;
  _id: string;
  image?: string;
  storeName: string;
  storeAvatar?: string;
  productName: string;
  name: any;
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

  const handleAddToCart = (e: React.MouseEvent) => {
    // prevent default navigation
    e.preventDefault();

    dispatch(
      addToCart({
        _id: product._id,
        brand: product.brand,
        price: product.price,
        quantity: 1,
        image: product.image,
        color: undefined,
        sizes: undefined,
        productName: undefined,
        storeName: undefined,
      })
    );
  };
  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(removeFromCart(product?._id));
  };

  return (
    <div className='relative w-fit'>
      {/* Link to Product Details */}
      <Link
        to={`/dashboard/buyer/product/${product?._id}`}
        className='block w-fit'
      >
        <div className='relative bg-black text-white rounded-lg overflow-hidden w-fit'>
          {/* Product Image */}
          <img
            src={product?.image}
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
            <h3 className='text-lg font-semibold'>{product?.productName}</h3>
            {/* <p className='text-gray-400 text-sm'>
              Sizes: {product?.sizes.join(", ")}
            </p> */}

            {/* Price */}
            <p className='text-lg font-bold mt-1'>{product?.price} NGN</p>
          </div>
        </div>
      </Link>

      {/* Floating Add to Cart Button (Prevents Navigation) */}
      {type == "cart" ? (
        <button
          onClick={handleRemoveFromCart}
          className='absolute top-2 right-2 bg-red-500 p-2 rounded-full shadow-md z-10'
        >
          <FaTrash className='text-white' />
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          className='absolute top-2 right-2 bg-green-500 p-2 rounded-full shadow-md z-10'
        >
          <FaShoppingCart className='text-white' />
        </button>
      )}
    </div>
  );
};

export default ProductSkeleton;
