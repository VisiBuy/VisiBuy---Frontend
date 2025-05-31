import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import SearchBox from "@/ui/buyer/header/SearchBox";
import CartIcon from "@/ui/buyer/header/CartIcon";
import DashboardButton from "@/ui/buyer/header/DashboardButton";
import logo from "../../assets/Buyer/logo.png";
import { dashboardConfig } from "@/lib/config";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ProfilePicture from "@/ui/buyer/header/ProfilePicture";
import { useQuery } from "@tanstack/react-query";
import { fetchBuyerInfo } from "@/modules/Buyer/lib/track-order/api";
import { BuyerInfo } from "@/types/buyerInfo";
import MobileSideBar from "@/ui/buyer/sidebar/MobileSideBar";

const getNameParts = (fullName: string) => {
  const parts = fullName.trim().split(" ");
  return {
    firstName: parts[0] || "",
    lastName: parts[1] || parts[0] || "",
  };
};

interface ProfileHeaderProps {
  isSmallScreen: boolean;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const ProfileHeader = ({
  isSmallScreen,
  isSidebarOpen,
  onToggleSidebar,
}: ProfileHeaderProps) => {
  const cartItems = useSelector((state: RootState) => state.buyer.cart.items);
  const navigate = useNavigate();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 640);

  const {
    data: buyerInfo,
    isLoading,
    error,
  } = useQuery<BuyerInfo>({
    queryKey: ["buyer-info"],
    queryFn: fetchBuyerInfo,
  });

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const { firstName, lastName } = buyerInfo?.fullName
    ? getNameParts(buyerInfo.fullName)
    : { firstName: "", lastName: "" };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const buyerConfig = dashboardConfig.getConfig("buyer");
  const homeUrl = `${buyerConfig.basePath.replace(/\/$/, "")}/${buyerConfig.routes.products.replace(/^\//, "")}`;

  return (
    <>
      <header className="bg-background fixed top-0 left-0 right-0 z-50 border-b border-gray-100 p-8">
        <div className="flex items-center justify-between">
          {/* Left: Hamburger (mobile only) + Logo + Beta */}
          <div className="flex items-center gap-3">
            <FaBars
              className="text-4xl text-blue font-extrabold cursor-pointer sm:hidden"
              onClick={onToggleSidebar}
            />
            <Link to={homeUrl} className="flex items-center gap-2">
              <img src={logo} alt="VisiBuy" className="h-6 sm:h-8" />
              <span className="bg-blue-200 text-blue text-xs font-bold px-2 py-0.5 rounded-lg">
                Beta
              </span>
            </Link>
          </div>

          {/* Right: Icons + Optional search (desktop) */}
          <div className="flex items-center gap-3">
            {isLargeScreen && (
              <SearchBox
                placeholder="Search outlets/products"
                onSearch={handleSearch}
              />
            )}
            <CartIcon itemCount={cartItems.length} />
            <DashboardButton />
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : error ? (
              <div className="text-red-500 text-sm">User error</div>
            ) : (
              <ProfilePicture firstName={firstName} lastName={lastName} />
            )}
          </div>
        </div>

        {/* Mobile Search under the header */}
        {!isLargeScreen && (
          <div className="mt-3">
            <SearchBox
              placeholder="Search outlets/products"
              onSearch={handleSearch}
            />
          </div>
        )}
      </header>

      {/* Sidebar Overlay */}
      <MobileSideBar isOpen={isSidebarOpen} onClose={onToggleSidebar} />
    </>
  );
};

export default ProfileHeader;
