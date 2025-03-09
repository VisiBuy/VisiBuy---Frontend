import React from "react";

interface LoadingSpinnerProps {
  isLoading: boolean; 
  size?: "small" | "medium" | "large"; // for different sizes
  color?: string; // for custom spinner color
}

const sizeClasses = {
  small: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20",
  medium: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32",
  large: "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40",
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
  size = "medium",
  color = "border-t-blue", 
}) => {
  if (!isLoading) return null;

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Spinner */}
      <div
        className={`absolute inset-0 border-4 sm:border-6 ${color} border-gray-300 rounded-full animate-spin`}
      ></div>

      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue">
          VISIBUY
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
