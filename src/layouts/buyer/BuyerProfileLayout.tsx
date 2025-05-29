import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FaSignOutAlt,
  FaUser,
  FaHeart,
  FaCog,
  FaMapMarkerAlt,
  FaChevronRight,
} from "react-icons/fa";
import clsx from "clsx";
import ProfileHeader from "./ProfileHeader";
import { fetchBuyerInfo } from "@/modules/Buyer/lib/track-order/api";
import { NotificationsProvider } from "@/context/notifications/NotificationsContext";
import { useLogout } from "@/modules/Auth/mutations/use-logout";

const BuyerProfileLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { mutate: logoutMutate } = useLogout();

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: buyerInfo } = useQuery({
    queryKey: ["buyer-info"],
    queryFn: fetchBuyerInfo,
  });

  const currentPath = location.pathname.split("/").pop();

  const navLinks = [
    { name: "Account Info", path: "account", icon: <FaUser /> },
    { name: "Favourites", path: "favourites", icon: <FaHeart /> },
    { name: "Address Book", path: "address", icon: <FaMapMarkerAlt /> },
    { name: "Settings", path: "settings", icon: <FaCog /> },
  ];

  const handleLogout = () => {
    logoutMutate();
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isSmallScreen && location.pathname.endsWith("/profile")) {
      navigate("account", { replace: true });
    }
  }, [isSmallScreen, location.pathname, navigate]);

  return (
    <NotificationsProvider>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Always render ProfileHeader */}
        <div className="w-full fixed left-0 top-0 z-50">
          <ProfileHeader
            isSmallScreen={isSmallScreen}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          />
        </div>

        {/* Breadcrumb */}
        <div className="pt-[85px] px-6 py-2 flex items-center gap-2 font-OpenSans text-lg md:text-xl font-medium">
          <span
            className="cursor-pointer hover:text-blue"
            onClick={() => navigate("/dashboard/buyer")}
          >
            Home
          </span>
          <FaChevronRight size={14} />
          <span
            className="cursor-pointer hover:text-blue"
            onClick={() => navigate("/dashboard/buyer/profile")}
          >
            My Profile
          </span>
          {currentPath !== "profile" && (
            <>
              <FaChevronRight size={14} />
              <span className="text-blue font-bold capitalize">
                {currentPath}
              </span>
            </>
          )}
        </div>

        {/* Layout */}
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Sidebar */}
          {(isSidebarOpen || !isSmallScreen) && (
            <aside
              ref={sidebarRef}
              className={clsx(
                "bg-white shadow-md w-full md:w-80 h-full md:h-auto overflow-y-auto px-4 py-7 space-y-6",
                {
                  hidden: isSmallScreen && !isSidebarOpen,
                },
              )}
            >
              <div className="text-center mt-6">
                <img
                  src={`https://ui-avatars.com/api/?name=${buyerInfo?.fullName ?? "User"}`}
                  alt="Profile"
                  className="w-20 h-20 mx-auto rounded-full mb-2 shadow"
                />
                <h2 className="text-xl md:text-2xl font-Montserrat font-semibold text-blue uppercase">
                  {buyerInfo?.fullName}
                </h2>
                <p className="text-lg md:text-xl text-gray-500 mb-10">
                  {buyerInfo?.email}
                </p>
              </div>

              <nav className="ml-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      navigate(link.path);
                      window.scrollTo(0, 0);
                      if (isSmallScreen) setIsSidebarOpen(false);
                    }}
                    className={clsx(
                      "flex items-center gap-5 py-2 text-left text-xl md:text-2xl font-Montserrat w-full hover:text-blue",
                      location.pathname.includes(link.path)
                        ? "text-blue font-bold"
                        : "text-secondary-foreground",
                    )}
                  >
                    {link.icon} {link.name}
                  </button>
                ))}
              </nav>

              <button
                onClick={handleLogout}
                className="pt-8 ml-2  flex items-center gap-2 font-OpenSans text-2xl text-red-500  hover:text-red-800 font-bold"
              >
                <FaSignOutAlt /> Logout
              </button>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </NotificationsProvider>
  );
};

export default BuyerProfileLayout;
