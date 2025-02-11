import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32">
        {/* Spinner */}
        <div className="absolute inset-0 border-4 sm:border-6 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        {/* Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">VISIBUY</span>
        </div>
      </div>
    </div>
  );

};

export default LoadingSpinner;
