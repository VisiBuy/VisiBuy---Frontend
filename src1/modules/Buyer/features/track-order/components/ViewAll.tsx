import React from "react";

interface ViewAllProps {
  onClick?: () => void;
}

const ViewAll: React.FC<ViewAllProps> = ({ onClick }) => {
  return (
    <div className="relative">
      {/* View All Button - Positioned at the top-right */}
      <span
        className="text-sm text-blue-600 font-semibold absolute right-2 hover:underline cursor-pointer"
        onClick={onClick}
      >
        View all
      </span>

      {/* Content Box - Add your content inside */}
      <div className="w-full h-40 bg-white mt-10 rounded-md shadow-md"></div>
    </div>
  );
};

export default ViewAll;
