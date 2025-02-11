import React from "react";

const SkeletonBox: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-gray-300 rounded-md animate-pulse ${className}`}></div>
);

const DashboardLoading: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* Top Navigation */}
      <div className="w-full bg-black text-white text-center p-2 text-sm">
        We just released the referral code feature on our dashboard 🎉. To earn delivery points, <a href="#" className="text-blue-400">Try it out.</a>
      </div>
       
      {/* Outlets Section */}
      <h2 className="text-2xl font-bold mb-4">Outlets</h2>
      <div className="grid grid-cols-5 gap-4 mb-8">
        {[...Array(5)].map((_, i) => (
          <SkeletonBox key={i} className="w-full h-24" />
        ))}
      </div>
      
      {/* Outlet Cards */}
      <h2 className="text-2xl font-bold mb-2">Outlets</h2>
      <p className="text-gray-600 mb-4">We just released the referral code feature on our dashboard 🎉. To earn delivery points, <a href="#" className="text-blue-400">Try it out.</a></p>
      
      <div className="grid grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-md">
            <SkeletonBox className="w-full h-32 mb-4" />
            <div className="flex items-center space-x-2 mb-2">
              <SkeletonBox className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <SkeletonBox className="w-2/3 h-4 mb-2" />
                <SkeletonBox className="w-1/2 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLoading;
