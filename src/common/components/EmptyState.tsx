import { FC } from "react";
import { FaBoxOpen } from "react-icons/fa";

interface EmptyStateProps {
  message: string;
}

const EmptyState: FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[300px] text-gray-500">
      <FaBoxOpen className="text-5xl mb-4 text-blue-500" />
      <p className="text-lg font-medium text-center">{message}</p>
    </div>
  );
};

export default EmptyState;
