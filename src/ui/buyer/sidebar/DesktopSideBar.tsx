import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { FaSignOutAlt } from "react-icons/fa";
import { dashboardConfig } from "../../../lib/config";
import logo from "../../../assets/Buyer/logo.png";
import {
  MainNav,
  SubNav,
} from "../../../modules/Buyer/components/BuyerNavItems";
import { useNotifications } from "@/context/notifications/NotificationsContext";


// Helper function to build a proper URL from the basePath and the relative path.
export function buildUrl(basePath: string, path: string) {
  if (!basePath.endsWith("/")) {
    basePath += "/";
  }
  if (path.startsWith("/")) {
    path = path.slice(1);
  }
  return `${basePath}${path}`;
}

const DesktopSideBar = () => {
  try {
    const buyerConfig = dashboardConfig.getConfig("buyer");
    const { basePath, routes } = buyerConfig;
    const location = useLocation();
    const { unreadCount } = useNotifications();


    return (
      <aside className="bg-white h-screen w-80 hidden sm:flex flex-col justify-between px-8 pt-10 pb-24 border border-gray-100">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to={buildUrl(basePath, routes.products)}>
            <img src={logo} alt="VisiBuy" className="h-6" />
          </Link>
          <span className="bg-blue-200 text-blue text-md font-bold px-5 py-1 rounded-lg">
            Beta
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          {/* Main Navigation */}
          {MainNav.map((item) => {
            const url = buildUrl(basePath, item.path);
            const isProducts = item.label === "Products";
            const isDashboardHome = location.pathname === basePath;
            const isActive = isProducts
              ? isDashboardHome || location.pathname === url // treat dashboard base as Products
              : location.pathname === url;

            return (
              <Link
                key={item.label}
                to={url}
                className={clsx(
                  "flex items-center gap-8 px-3 py-6 text-2xl rounded-md font-OpenSans transition-colors",
                  isActive
                    ? "text-blue font-extrabold"
                    : "text-black font-semibold",
                  "hover:bg-blue-200 hover:text-blue hover:font-bold"
                )}
              >
                {/* Notification icon with badge */}
                {item.label === "Notification" ? (
                  <button className="relative bg-transparent flex items-center p-0">
                    {React.isValidElement(item.icon)
                      ? React.cloneElement(item.icon)
                      : item.icon}
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-2 transform translate-x-1/2 -translate-y-1/2">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ) : React.isValidElement(item.icon) ? (
                  React.cloneElement(item.icon)
                ) : (
                  item.icon
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sub Navigation */}
        <div className="border-t pt-4 mt-4">
          {SubNav.map((item) => {
            const url = buildUrl(basePath, item.path);
            const isActive = location.pathname === url;

            return (
              <Link
                key={item.label}
                to={url}
                className={clsx(
                  "flex items-center gap-8 px-3 py-6 text-2xl rounded-md font-OpenSans transition-colors",
                  isActive
                    ? "text-blue font-extrabold"
                    : "text-black font-semibold",
                  "hover:bg-blue-200 hover:text-blue hover:font-bold"
                )}
              >
                {React.isValidElement(item.icon)
                  ? React.cloneElement(item.icon)
                  : item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div>
          <button className="flex items-center gap-6 text-red-500 text-2xl font-bold">
            <FaSignOutAlt size={20} /> <span>LogOut</span>
          </button>
        </div>
      </aside>
    );
  } catch (error) {
    console.error("Error fetching buyer config:", error);
    return null;
  }
};

export default DesktopSideBar;
