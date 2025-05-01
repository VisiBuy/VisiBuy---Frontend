const SkeletonOrderCard = () => {
  return (
    <div className="animate-pulse flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-200 shadow-md p-6 rounded-md">
      <div className="w-2/3">
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
      </div>
      <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
        <div className="h-3 bg-gray-300 rounded w-16 mt-1"></div>
      </div>
    </div>
  );
};

export default SkeletonOrderCard;
