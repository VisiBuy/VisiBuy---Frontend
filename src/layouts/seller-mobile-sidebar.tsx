import { useAppDispatch } from "@/hooks/app-hooks";
import { dashboardConfig } from "@/lib/config";
import { createQueryString } from "@/lib/utils";
import { logout } from "@/modules/Auth/features/slices";
import { NavItem } from "@/modules/Seller/components/navbar-item";
import { NavItemProps } from "@/types/navItem";
import { Button } from "@/ui/Button";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

interface ISellerMobileSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}
const navlinks: NavItemProps[] = [
  { name: "Products", href: "products", iconName: "briefcase" },
  {
    name: "Order Details",
    href: "orders",
    iconName: "file-spreadsheet",
  },
  {
    name: "Notifications",
    href: "?modal=notification",
    iconName: "bell",
  },
];
export const SellerMobileSideBar: React.FC<ISellerMobileSideBarProps> = ({
  isOpen,
  onClose,
}) => {
  //const auth = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sellerLinks = useMemo(() => {
    return {
      helpSupport: dashboardConfig.getFullPath("seller", "helpSupport"),
      feedback: dashboardConfig.getFullPath("seller", "feedback"),
    };
  }, []);
  const handleAddProduct = useCallback(
    function () {
      const queryStrings = createQueryString(
        "modal",
        "add-product",
        searchParams.toString()
      );
      setSearchParams(queryStrings);
    },
    [searchParams]
  );
  const handleLogout = () => {
    localStorage.removeItem('redirectPath');
    dispatch(logout());
    navigate("/login");
  };
  // ✅ Get the unread notifications count
  // const { unreadCount } = useNotifications();
  useEffect(() => {
    //close sidebar if path changes and its open
    if (isOpen) {
      onClose();
    }
  }, [searchParams, location.pathname]);
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50  ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:hidden`}
    >
      <div className="bg-white w-96 h-full flex flex-col p-6 transition-transform transform">
        {/* Close Button */}
        <button className="self-end" onClick={onClose}>
          <RxCross2 size={24} className="text-blue" />
        </button>
        <div className="w-full  mt-20">
          <Button
            size="lg"
            onClick={handleAddProduct}
            className="min-w-full font-regular text-2xl justify-center bg-blue border-none hover:bg-blue hover:text-white"
          >
            <Plus></Plus> Add new product
          </Button>
        </div>
        <div className="flex flex-col items-center text-left pt-12 w-full ">
          {navlinks.map(({ name, href, iconName }) => (
            <NavItem
              key={name}
              name={name}
              href={
                href.startsWith("?")
                  ? `${location.pathname}${href}`
                  : `/dashboard/seller/${href}`
              }
              iconName={iconName}
            />
          ))}
        </div>
        <div className="w-full px-4 mt-96">
          <div className="rounded-xl bg-blue-200 px-6 py-6 w-full">
            <Link
              to={sellerLinks.feedback}
              className="text-blue flex items-center text-2xl font-OpenSans font-semibold gap-4"
            >
              <img src="/feedback.svg" width={20} alt="feedback " />{" "}
              <h3>Feedback</h3>
            </Link>
            <Link
              to={sellerLinks.helpSupport}
              className="text-blue flex items-center text-2xl font-OpenSans font-semibold gap-4 my-6"
            >
              <img src="/call-support.svg" width={15} alt="support" />{" "}
              <h3>Help & Support</h3>
            </Link>
            <Link
              to=""
              onClick={handleLogout}
              className="text-blue flex items-center text-2xl font-OpenSans font-semibold gap-4"
            >
              <img src="/Logout.svg" width={20} alt="logout" /> <h3>LogOut</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
