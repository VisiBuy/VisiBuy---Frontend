import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";

interface ErrorHolderProps {
  message?: string;
  duration?: number; // in milliseconds
  onClose?: () => void;
}

const ErrorHolder: React.FC<ErrorHolderProps> = ({
  message,
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
    <div className='fixed top-5 right-5 bg-white shadow-lg rounded-lg flex items-center p-4 space-x-3 border border-gray-200'>
      <CircleX className='text-red-500' size={24} />
      <span className='text-black font-medium'>{message}</span>
    </div>
  );
};

export default ErrorHolder;
