"use client";

import { cn } from "../../../lib/utils";
import { cva } from "class-variance-authority";
import { useLocation, Link } from "react-router-dom";
import { useMemo } from "react";
import Icon, { IconNameProps, IconProps } from "../../../ui/Icon";
import { NavItemProps } from "../../../types/navItem";

export const NavItem = (props: NavItemProps) => {
  const { href, name, isLight, iconName } = props;
  const { pathname } = useLocation();

  const navVariants = cva(
    "text-3xl relative font-OpenSans pl-12 py-8 flex gap-8",
    {
      variants: {
        status: {
          default:
            " w-full text-nav-foreground hover:text-nav-foreground-active hover:text-blue",
          active:
            "w-full text-blue before:rotate-90 before:absolute before:top-16 before:-left-7 before:w-16 before:h-2  before:transform before:-translate-y-4 before:-mb-2 before:content-[''] before:bg-blue before:inline-block ",
          light: "text-[#EFEFEF] hover:text-[#FFE9B0]",
          lightActive:
            "text-[#FFE9B0] before:absolute before:bottom-0 before:left-[50%] before:w-2 before:h-2 before:rounded-full before:transform before:-translate-x-1/2 before:-mb-2 before:content-[''] before:bg-[#FFE9B0]",
        },
      },
    }
  );

  const isActive = useMemo(() => {
    if (isLight) {
      return pathname === href ? "lightActive" : "light";
    }

    return pathname === `/dashboard/seller/${href}` ? "active" : "default";
  }, [isLight, pathname, href]);

  return (
    <Link
      key={href}
      to={`/dashboard/seller/${href}`}
      className={cn(navVariants({ status: isActive }))}
    >
      <Icon name={iconName} className='' size='30' />
      {name}
    </Link>
  );
};
