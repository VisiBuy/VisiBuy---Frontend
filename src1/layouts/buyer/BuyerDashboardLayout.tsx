import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import MobileSideBar from "../../ui/buyer/sidebar/MobileSideBar";
import LoadingSpinner from "../../ui/LoadingSpinner";

const BuyerDashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true); // For main content
  const location = useLocation(); // Detect route changes

  useEffect(() => {
    // Simulate loading on each route change
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className='flex h-screen relative'>
      {/* Sidebar (Visible Immediately) */}
      <SideBar />

      {/* Main Layout */}
      <div className='flex flex-col flex-1'>
        {/* Header (Visible Immediately) */}
        <HeaderBar
          onMenuClick={() => setIsMobileOpen(true)}
          isSidebarOpen={isMobileOpen}
          setIsSidebarOpen={setIsMobileOpen}
        />

        {/* Main Content Area */}
        <main className='p-4 h-full'>
          {loading ? (
            // Spinner only in main content area
            <div className='flex items-center justify-center h-full'>
              <LoadingSpinner isLoading={true} size='large' />
            </div>
          ) : (
            // Render child routes when loading finishes
            <Outlet />
          )}
        </main>
      </div>

      {/* Mobile Sidebar */}
      <MobileSideBar
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </div>
  );
};

export default BuyerDashboardLayout;
