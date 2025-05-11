import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBuyerInfo } from "@/modules/Buyer/lib/track-order/api";
import {
  FaSignOutAlt,
  FaUser,
  FaHeart,
  FaCog,
  FaMapMarkerAlt,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import clsx from "clsx";
import ProfileHeader from "./ProfileHeader";

const BuyerProfileLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  const { data: buyerInfo } = useQuery({
    queryKey: ["buyer-info"],
    queryFn: fetchBuyerInfo,
  });

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target as Node) &&
      window.innerWidth < 768
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    });
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentPath = location.pathname.split("/").pop();

  const navLinks = [
    { name: "Account Info", path: "account", icon: <FaUser /> },
    { name: "Favourites", path: "favourites", icon: <FaHeart /> },
    { name: "Address Book", path: "address", icon: <FaMapMarkerAlt /> },
    { name: "Settings", path: "settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="w-full fixed left-0 top-0 z-50">
        <ProfileHeader
          onMenuClick={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Breadcrumb */}
      <div className="pt-[85px] px-12 py-2 flex items-center gap-2 font-OpenSans text-lg md:text-xl font-medium">
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

      {/* Sidebar + Content */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Overlay for small screens */}
        {isSidebarOpen && window.innerWidth < 768 && (
          <div className="fixed inset-0 z-30 bg-black bg-opacity-40"></div>
        )}

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={clsx(
            "bg-white shadow-md w-80 z-40 md:relative md:translate-x-0 fixed h-screen md:h-auto overflow-y-auto px-4 py-7 space-y-6",
            {
              "translate-x-0": isSidebarOpen,
              "-translate-x-full": !isSidebarOpen && window.innerWidth < 768,
            }
          )}
        >
          {/* Close button */}
          {window.innerWidth < 768 && (
            <button
              className="absolute top-4 left-4 text-gray-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaTimes size={20} />
            </button>
          )}

          {/* Profile */}
          <div className="text-center mt-6">
            <img
              src={`https://ui-avatars.com/api/?name=${buyerInfo?.fullName ?? "User"}`}
              alt="Profile"
              className="w-20 h-20 mx-auto rounded-full mb-2 shadow"
            />
            <h2 className="text-xl md:text-2xl font-Montserrat font-semibold text-blue uppercase">
              {buyerInfo?.fullName}
            </h2>
            <p className="text-lg md:text-xl text-gray-500 mb-10">{buyerInfo?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="ml-6  space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={clsx(
                  "flex items-center gap-5 py-2 text-left text-xl md:text-2xl font-Montserrat w-full hover:text-blue",
                  location.pathname.includes(link.path)
                    ? "text-blue font-bold"
                    : "text-secondary-foreground"
                )}
              >
                {link.icon} {link.name}
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="pt-8 ml-2 text-xl md:text-2xl font-OpenSans flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
          >
            <FaSignOutAlt /> Logout
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BuyerProfileLayout;
