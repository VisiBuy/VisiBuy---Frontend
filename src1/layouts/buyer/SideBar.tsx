import { useState } from "react";
import DesktopSideBar from "../../ui/buyer/sidebar/DesktopSideBar";
import MobileSideBar from "../../ui/buyer/sidebar/MobileSideBar";

const SideBar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar (Hidden on small screens) */}
      <DesktopSideBar />

      {/* Mobile Sidebar (Hidden on large screens) */}
      <MobileSideBar
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
};

export default SideBar;
