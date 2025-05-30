import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { RootState } from "@/store/store";
import SideBar from "../../layouts/buyer/SideBar";
import HeaderBar from "../../layouts/buyer/HeaderBar";
import MobileSideBar from "../../ui/buyer/sidebar/MobileSideBar";
import OnboardingModal from "@/common/components/OnboardingModal";
import { NotificationsProvider } from "@/context/notifications/NotificationsContext";
import { useDispatch } from "react-redux";
import { setUser } from "@/modules/Auth/features/slices";
import AuthService from "@/modules/Auth/lib/service";


const BuyerDashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const freshUser = await AuthService.getCurrentUser("buyer");
        dispatch(setUser(freshUser));
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);


  useEffect(() => {
    if (user && !user.hasCompletedOnboarding) {
      console.log("👤 User state:", user);
      console.log("👤 User state:", user.hasCompletedOnboarding);
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false);
    }
  }, [user]);

  return (
    <NotificationsProvider>
      <div className="flex h-screen overflow-hidden relative">
        {/* Sidebar */}
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

          {/* Main Content */}
          <main className="p-4 md:p-16 h-[calc(100vh-4rem)] overflow-y-auto mt-40 md:mt-16">
            <Outlet />
          </main>
        </div>

        {/* Mobile Sidebar */}
        <MobileSideBar
          isOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
        />

        {/* Onboarding Modal */}
        <AnimatePresence>
          {showOnboarding && (
            <OnboardingModal onFinish={() => setShowOnboarding(false)} />
          )}
        </AnimatePresence>
      </div>
    </NotificationsProvider>
  );
};

export default BuyerDashboardLayout;
