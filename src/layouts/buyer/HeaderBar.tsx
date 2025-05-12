import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import SearchBox from "../../ui/buyer/header/SearchBox";
import CartIcon from "../../ui/buyer/header/CartIcon";
import DashboardButton from "../../ui/buyer/header/DashboardButton";
import logo from "../../assets/Buyer/logo.png";
import { dashboardConfig } from "../../lib/config";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ProfilePicture from "@/ui/buyer/header/ProfilePicture";
import { useQuery } from "@tanstack/react-query";
import { fetchBuyerInfo } from "@/modules/Buyer/lib/track-order/api";
import { BuyerInfo } from "@/types/buyerInfo";

interface HeaderBarProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Utility to split fullName
const getNameParts = (
  fullName: string
): { firstName: string; lastName: string } => {
  const parts = fullName.trim().split(" ");
  return {
    firstName: parts[0] || "",
    lastName: parts[1] || parts[0] || "",
  };
};

const HeaderBar: React.FC<HeaderBarProps> = ({
  onMenuClick,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const cartItems = useSelector((state: RootState) => state.buyer.cart.items);
  const navigate = useNavigate();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 640);

  // Fetch buyer info from API
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

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { firstName, lastName } = buyerInfo?.fullName
    ? getNameParts(buyerInfo.fullName)
    : { firstName: "", lastName: "" };

  const buyerConfig = dashboardConfig.getConfig("buyer");
  const homeUrl = `${buyerConfig.basePath.replace(/\/$/, "")}/${buyerConfig.routes.products.replace(/^\//, "")}`;

  return (
    <header className="bg-background fixed top-0 left-0 md:left-80 right-0 z-50 border border-gray-100 p-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <FaBars
            className="text-4xl text-blue font-extrabold cursor-pointer sm:hidden"
            onClick={onMenuClick}
          />
          <div className="flex items-center gap-2 sm:hidden">
            <Link to={homeUrl}>
              <img src={logo} alt="VisiBuy" className="h-6" />
            </Link>
            <span className="bg-blue-200 text-blue text-xs font-bold px-3 py-1 rounded-lg">
              Beta
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isLargeScreen && (
            <SearchBox
              placeholder="Search outlets/products"
              onSearch={handleSearch}
            />
          )}
          <CartIcon itemCount={cartItems.length} />
          <DashboardButton />

          {/* Profile Picture */}
          {isLoading ? (
            <div className="text-sm text-gray-500 animate-pulse">
              
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">Failed to load user</div>
          ) : (
            <ProfilePicture firstName={firstName} lastName={lastName} />
          )}
        </div>
      </div>

      {!isLargeScreen && (
        <div className="mt-4">
          <SearchBox
            placeholder="Search outlets/products"
            onSearch={handleSearch}
          />
        </div>
      )}
    </header>
  );
};

export default HeaderBar;
