import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useMemo } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

interface NavItemProps {
  href: string;
  name: string;

  onClick?: () => void;
}
export const NavItem = (props: NavItemProps) => {
  const { name, onClick, href } = props;
  const { pathname } = useLocation();

  const navVariants = cva("", {
    variants: {
      status: {
        default:
          "text-visibuy-dark-gray hover:text-visibuy-primary transition-colors font-medium",
        active:
          "text-visibuy-primary  hover:text-visibuy-primary transition-colors font-medium",
      },
    },
  });

  const isActive = useMemo(() => {
    if (pathname === "/home" ) return "active";
    return pathname === href ? "active" : "default";
  }, [pathname]);

  return (
    <Link to={href} className={cn(navVariants({ status: isActive }))}>
      {name}
    </Link>
  );
};
