import { MainLayout } from "@/layouts/main-layout";
import { dashboardConfig } from "@/lib/config";
import { capitalize, cn } from "@/lib/utils";
import Icon from "@/ui/Icon";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import { SupportCard } from "./components/support-card";
import { useCallback, useMemo } from "react";
const storeSupportLinks = [
  {
    title: "How to Receive and Fulfill Orders",
    link: "get-started",
    icon: "/bag-tick-2.svg",
  },
  {
    title: "How and When You Get Paid",
    link: "how-to-get-payed",
    icon: "/money-send.svg",
  },
  {
    title: "How to Get Verified Easily (Visual Verification)",
    link: "get-verified",
    icon: "/shop.svg",
  },
  { title: "Order Management", link: "order-management", icon: "/shop.svg" },
  { title: "Cancel Order", link: "cancel-order", icon: "/close-circle.svg" },
];
const storeFaqLinks = [
  { title: "Payment", link: "faq/payment", icon: "/digital-payment 1.svg" },
  { title: "Deliver", link: "faq/delivery", icon: "/truck.svg" },
  { title: "Products", link: "faq/product", icon: "/bag-2.svg" },
  { title: "Vouchers", link: "faq/vouchers", icon: "/ticket.svg" },
  {
    title: "Sell Products on Visibuy",
    link: "faq/sell-on-visibuy",
    icon: "/shopping-bag.svg",
  },
];
export function HelpSupportScreen() {
  const sellerSupportPath = useMemo(
    () => dashboardConfig.getFullPath("seller", "helpSupport"),
    []
  );

  const match = useMatch(sellerSupportPath);
  const location = useLocation();
  const getLastPathName = useCallback(() => {
    const pathArray = location.pathname.split("/");
    return pathArray[pathArray.length - 1];
  }, [location]);

  const matchLink = useMemo(() => {
    const currentPath = getLastPathName();
    return [...storeFaqLinks, ...storeSupportLinks].find((link) => {
      if (link.link === currentPath) return link.title;
    });
  }, [location]);

  return (
    <div>
      {/* default layout  */}
      {match && (
        <MainLayout title="Help & Support">
          <div className="px-2 lg:px-10 pt-10">
            <h2 className="text-4xl font-semibold font-Montserrat">
              How can we help you today?
            </h2>
            <h3 className="mt-16 mb-8 text-2xl font-Montserrat font-medium">
              Store Guides
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4">
              {storeSupportLinks.map(({ title, link, icon }) => (
                <SupportCard
                  key={title}
                  title={title}
                  link={link}
                  icon={icon}
                />
              ))}
            </div>
            <h3 className="mt-16 mb-8 text-2xl font-Montserrat font-medium">
              Frequently Asked Questions (FAQ)
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4">
              {storeFaqLinks.map(({ title, link, icon }) => (
                <SupportCard
                  key={title}
                  title={title}
                  link={link}
                  icon={icon}
                />
              ))}
            </div>
          </div>
        </MainLayout>
      )}
      {match === null && (
        <MainLayout
          className="min-h-full"
          title={
            <div className="flex gap-x-4 items-center ">
              <Link to="" className="bg-light-gray px-4 py-2 ">
                {" "}
                <Icon name="move-left" width={20} />
              </Link>

              {capitalize(matchLink?.title)}
            </div>
          }
        >
          <Outlet />
        </MainLayout>
      )}
      <div
        className={cn(
          `border border-light-gray py-10 px-10 lg:px-20  h-full mt-8 rounded-xl `
        )}
      >
        <h2 className="text-4xl font-semibold font-Montserrat">
          Talk to an agent
        </h2>
        <div className="grid  grid-cols-1 lg:grid-cols-2  gap-y-4  mt-8">
          <div className="flex items-center px-6 py-8 bg-blue-200 rounded-md hover:cursor-pointer">
            <span>
              <img src="/messages-3.svg" alt="chat icon" />
            </span>
            <div className="flex-1 ml-6">
              <h3 className="text-foreground text-2xl mb-4 text-left font-Montserrat font-bold ">
                Live Chat
              </h3>
              <p className="text-xl lg:text-2xl font-Montserrat">
                We are available from Monday to Sunday, between 8am and 7pm.
              </p>
            </div>
          </div>
          <div className="flex items-center px-6 py-8 bg-blue-200 rounded-md hover:cursor-pointer">
            <span>
              <img src="/messages-3.svg" alt="chat icon" />
            </span>
            <div className="flex-1 ml-6">
              <h3 className="text-foreground text-2xl mb-4 text-left font-Montserrat font-bold ">
                Call an agent
              </h3>
              <p className="text-xl lg:text-2xl font-Montserrat ">
                We are available from Monday to Friday, between 8am and 5pm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
