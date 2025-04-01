import { useState } from "react";
import DesktopSideBar from "../../ui/buyer/sidebar/DesktopSideBar";
import MobileSideBar from "../../ui/buyer/sidebar/MobileSideBar";

const SideBar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar (Fixed for large screens) */}
      <div className="hidden sm:block fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50">
        <DesktopSideBar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSideBar
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
};

export default SideBar;
