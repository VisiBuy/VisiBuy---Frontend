import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface OrderSuccessProps {
  message?: string;
  duration?: number; // in milliseconds
  onClose?: () => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({
  message = "Sneaker added to cart successfully",
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className='fixed top-5 right-5 bg-white shadow-lg rounded-lg flex items-center p-4 space-x-3 border border-gray-200 z-[9999]'>
      <CheckCircle className='text-green-500' size={24} />
      <span className='text-black font-medium'>{message}</span>
    </div>
  );
};

export default OrderSuccess;
