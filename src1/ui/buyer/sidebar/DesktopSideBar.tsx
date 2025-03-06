import React from "react"; // Import React for JSX and utilities
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { FaSignOutAlt } from "react-icons/fa";
import { dashboardConfig } from "../../../lib/config";
import logo from "../../../assets/Buyer/logo.png";
import { buyerNavItems } from "../../../modules/Buyer/components/BuyerNavItems";

// Helper function to build a proper URL from the basePath and the relative path.
function buildUrl(basePath: string, path: string) {
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

    return (
      <aside className="bg-white h-screen w-72 hidden sm:flex flex-col justify-between px-12 pt-10 pb-24 border border-gray-100">
        {/* Logo + Beta Badge */}
        <div className="flex items-center gap-2">
          {/* Logo wrapped in a Link to always navigate to buyer's home */}
          <Link to={buildUrl(basePath, routes.home)}>
            <img src={logo} alt="VisiBuy" className="h-6" />
          </Link>
          <span className="bg-blue-200 text-blue text-xs font-bold px-3 py-1 rounded-md">
            Beta
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          {buyerNavItems.map((item) => {
            const url = buildUrl(basePath, item.path);
            const isActive = location.pathname === url;

            return (
              <Link
                key={item.label}
                to={url}
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 rounded-sm transition-colors",
                  isActive ? "text-blue font-bold" : "text-black font-semibold",
                  "hover:bg-blue-200 hover:text-blue"
                )}
              >
                {React.isValidElement(item.icon)
                  ? React.cloneElement(item.icon as React.ReactElement<any>, {
                      className: "text-current",
                    })
                  : item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div>
          <button className="flex items-center gap-2 text-red-500 font-bold">
            <FaSignOutAlt size={18} /> <span>LogOut</span>
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
