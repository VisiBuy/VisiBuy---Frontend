import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { dashboardConfig } from "../../../lib/config";

const CartIcon = ({ itemCount }: { itemCount: number }) => {
  const cartPath = dashboardConfig.getFullPath("buyer", "carts");

  return (
    <Link to={cartPath} className='relative'>
      <div className='p-3 bg-blue-200 rounded-full flex items-center justify-center'>
        <FaShoppingCart className='text-2xl md:text-4xl text-blue' />
      </div>
      {itemCount > 0 && (
        <span className='absolute -top-1 -right-1 bg-blue text-white text-xs rounded-full px-2'>
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
