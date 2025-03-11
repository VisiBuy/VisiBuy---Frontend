import React from "react";
import { Skeleton } from "./Skeleton";

const DashboardLoading: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* Top Banner */}
      <div className="w-full bg-black text-white text-center p-2 text-sm">
        🎉 We just released the referral code feature on our dashboard. To earn delivery points,
        <a href="#" className="text-blue-400 underline">Try it out.</a>
      </div>

      {/* Outlet Section */}
      <h2 className="text-2xl font-bold mb-4">Outlets</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-full h-24 bg-gray-300 dark:bg-gray-700" />
        ))}
      </div>

      {/* Outlet Card Section */}
      <h2 className="text-2xl font-bold mb-2">Outlets</h2>
      <p className="text-gray-600 mb-4">
        🎉 We just released the referral code feature on our dashboard. To earn delivery points,
        <a href="#" className="text-blue-400 underline">Try it out.</a>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-md">
            <Skeleton className="w-full h-32 mb-4 bg-gray-300 dark:bg-gray-700" />
            <div className="flex items-center space-x-2 mb-2">
              <Skeleton className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="flex-1">
                <Skeleton className="w-2/3 h-4 mb-2 bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="w-1/2 h-4 bg-gray-300 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLoading;
