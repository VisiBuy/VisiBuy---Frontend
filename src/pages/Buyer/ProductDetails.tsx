import {
  addToCart,
  updateQuantity,
} from "@/modules/Buyer/features/cart/cartSlice";
import { RootState } from "@/store/store";
import OrderSuccess from "@/ui/buyer/OrderSuccess";
import { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ErrorHolder from "@/ui/buyer/ErrorHolder";
import { UserActivityTracker } from "@/lib/activity-tracker/user-activity-tracker";
import { facebookTracker } from "@/lib/activity-tracker/facebook-tracker";

interface Product {
  _id: string;
  brand: string;
  model: string;
  description: string;
  images: string[];
  storeName: string;
  storeAvatar: string;
  size?: number[];
  price: number;
  color?: string[];
  quantity: number;
}

function ProductDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const products = useSelector(
    (state: RootState) => state.buyer.product.products
  );
  const cartItems = useSelector((state: RootState) => state.buyer.cart.items);

  const [data, setData] = useState<Product | null>(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showErrorHolder, setShowErrorHolder] = useState(false);

  const [localQuantity, setLocalQuantity] = useState(1);

  // selected color and size for cart
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  // Get product quantity in cart
  const cartItem = cartItems.find((item) => item._id === id);
  const quantity = cartItem ? cartItem.quantity : localQuantity;

  // facebook tracker
  const userActivityTracker = new UserActivityTracker([facebookTracker]);
  const trackAddToCartClick = (addToCartClicked) => {
    console.log(addToCartClicked)
      userActivityTracker.trackActivity("track", "AddToCart", {
        product_name: addToCartClicked?.model,
        product_id: addToCartClicked?._id,
        product_price: addToCartClicked?.price,
      });
  }

  useEffect(() => {
    // Find the product by matching the id with the `id` in the products array
    const foundProduct = products.find((p) => p._id === id);
    setData(foundProduct ?? null); // Set the product or null if not found
  }, [id, products]); // Re-run effect when id or products change

  const handleOrderSuccess = () => {
    console.log(quantity);
    if (!data) return;
    if (!selectedColor || !selectedSize) return setShowErrorHolder(true);
    dispatch(
      addToCart({
        ...data,
        _id: data._id!,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
      })
    );
    trackAddToCartClick(data)
    setShowOrderSuccess(true);
  };
  const handleAddToQuantity = () => {
    // check if data exist
    if (!data || !data._id) return;
    // do nothing if quantity is <= 1
    if (quantity <= 1) return;

    if (cartItem) {
      dispatch(updateQuantity({ id: data._id, quantity: quantity - 1 }));
    } else {
      setLocalQuantity((prev) => prev - 1);
    }
  };

  const handleMinusToQuantity = () => {
    // check if data exist
    if (!data || !data._id) return;
    if (cartItem) {
      dispatch(updateQuantity({ id: data._id, quantity: quantity + 1 }));
    } else {
      setLocalQuantity((prev) => prev + 1);
    }
  };
  // console.log(data)

  return (
    <div className='h-[100%] w-[93%] p-8'>
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 text-blue-500 hover:text-blue-700 font-semibold mb-4'
      >
        <FaArrowLeft /> Back
      </button>
      {showErrorHolder && (
        <ErrorHolder
          message='Size/Color can not be empty!'
          onClose={() => setShowErrorHolder(false)}
        />
      )}

      {showOrderSuccess && (
        <OrderSuccess onClose={() => setShowOrderSuccess(false)} />
      )}

      <div className='w-[100%] flex flex-col py-8 text-xl gap-8'>
        {/* title */}
        <h2 className='font-semibold uppercase text-2xl'>{data?.model}</h2>

        {/* image */}
        {/* <div className='h-[263px] flex justify-center'>
          {data?.images && (
            <img
              src={data.images[0]}
              alt={data.model}
              className='w-[75%] h-[80%]'
            />
          )}
        </div> */}
        {/* Desktop View: Display images side by side */}
        <div
          className='hidden lg:flex space-x-4 w-full'
          // style={{ overflowY: "auto" }}
        >
          {data?.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={data?.model}
              className='w-full rounded-lg shadow-md'
            />
          ))}
        </div>

        {/* ipad View: Display images side by side */}
        <div className='hidden md:flex lg:hidden space-x-4 w-full max-w-[30rem] mx-auto'>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1.06}
            pagination={{ clickable: true }}
          >
            {data?.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={data?.model}
                  className='w-full h-[190px] rounded-lg shadow-md'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile View: Image Slider with Custom Navigation */}
        <div className='relative md:hidden w-full max-w-[29rem] mx-auto'>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1.05}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            pagination={{ clickable: true }}
          >
            {data?.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={data?.model}
                  className='rounded-lg shadow-md'
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          {/* <button
            // ref={prevRef}
            className='swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-700 transition text-sm'
          >
            <FaChevronLeft className='' size={10} />
          </button>
          <button
            // ref={nextRef}
            className='swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-700 transition text-sm'
          >
            <FaChevronRight className='' size={10} />
          </button> */}
        </div>

        {/* color and sizes */}
        <div className='flex gap-8'>
          {/* Color Selection */}
          {data?.color && data?.color?.length > 0 && (
            <div className='flex flex-col'>
              <label
                htmlFor='color'
                className='text-gray-700 font-semibold mb-1'
              >
                Color
              </label>
              <select
                id='color'
                className='sm:min-w-[50px] min-w-[150px] h-12 border-2 border-gray-300 rounded-lg px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200'
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value='' disabled className='text-gray-400'>
                  Select a color
                </option>
                {data.color.map((col, index) => (
                  <option key={index} value={col} className='text-gray-900'>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Size Selection */}
          {data?.size && data?.size?.length > 0 && (
            <div className='flex flex-col'>
              <label
                htmlFor='size'
                className='text-gray-700 font-semibold mb-1'
              >
                Size
              </label>
              <select
                id='size'
                className='sm:min-w-[50px] min-w-[150px] h-12 border-2 border-gray-300 rounded-lg px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200'
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value='' disabled className='text-gray-400'>
                  Select a size
                </option>
                {data.size.map((sz, index) => (
                  <option key={index} value={sz} className='text-gray-900'>
                    {sz}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Quantity and Order Actions */}
        <div className='md:w-md'>
          {/* <label htmlFor=''>Amount:</label>
          {/* <div>{subtotal}</div> */}
          {/*<span className='px-4 text-2xl font-semibold'>
            ₦{data?.price * quantity}
          </span> */}
          <label htmlFor='amount'>Amount:</label>
          <span className='px-4 text-2xl font-semibold'>
            ₦
            {data?.price && quantity
              ? (data.price * quantity).toLocaleString()
              : data?.price}
          </span>

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
              className='w-[264px] h-12 mt-6 px-2 md:px-6 font-semibold rounded-md bg-green-600 text-white cursor-pointer hover:bg-green-400 flex items-center justify-center gap-6'
              onClick={handleOrderSuccess}
              type='submit'
            >
              <FaShoppingCart className='text-white' size={14} /> Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
