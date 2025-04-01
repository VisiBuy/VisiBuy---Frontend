import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../layouts/buyer/SideBar";
import HeaderBar from "../../layouts/buyer/HeaderBar";
import MobileSideBar from "../../ui/buyer/sidebar/MobileSideBar";
import LoadingSpinner from "@/ui/LoadingSpinner";

const BuyerDashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (Hidden on mobile) */}
      <div className="hidden sm:block">
        <SideBar />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col flex-1 sm:ml-64">
        {/* Header */}
        <HeaderBar
          onMenuClick={() => setIsMobileOpen(true)}
          isSidebarOpen={isMobileOpen}
          setIsSidebarOpen={setIsMobileOpen}
        />

        {/* Main Content (Scrollable) */}
        <main className="p-4 md:p-16 h-[calc(100vh-4rem)] overflow-y-auto mt-40 md:mt-16">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner isLoading={true} size="large" />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      {/* Mobile Sidebar (Overlay) */}
      <MobileSideBar
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </div>
  );
};

export default BuyerDashboardLayout;
