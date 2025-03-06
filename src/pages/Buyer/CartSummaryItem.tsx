import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
} from "@/modules/Buyer/features/cart/cartSlice";

interface CartSummaryItemProps {
  item: {
    _id: string;
    images: string;
    model: string;
    color?: string[];
    sizes?: number[];
    quantity: number;
    price: number;
  };
}

const CartSummaryItem: React.FC<CartSummaryItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  console.log(item);

  return (
    <div key={item._id} className='flex items-center gap-4 border-b pb-4'>
      <img
        src={item.images[0]}
        alt={item.model}
        className='w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover'
      />
      <div className='flex-1'>
        <h3 className='font-semibold text-sm md:text-base'>{item.model}</h3>
        {/* <p className='text-gray-500 text-xs md:text-sm'>
          {item?.color.join(", ")}
        </p>
        <p className='text-gray-500 text-xs md:text-sm'>
          Size: {item.sizes.join(", ")}
        </p> */}
        <div className='flex items-center mt-2'>
          <button
            onClick={() =>
              dispatch(
                updateQuantity({ id: item._id, quantity: item.quantity - 1 })
              )
            }
            className='p-1 border rounded-md'
          >
            <Minus size={14} />
          </button>
          <span className='px-3 text-sm'>{item.quantity}</span>
          <button
            onClick={() =>
              dispatch(
                updateQuantity({ id: item._id, quantity: item.quantity + 1 })
              )
            }
            className='p-1 border rounded-md'
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <p className='font-semibold'>#{item.price * item.quantity}</p>
        <button
          onClick={() => dispatch(removeFromCart(item._id))}
          className='text-red-500 text-xs flex items-center gap-1'
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartSummaryItem;
