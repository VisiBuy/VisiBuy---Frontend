
import React from "react";
import { Store, Map, MessageSquare } from "lucide-react";
import { FaHome } from "react-icons/fa";

import { dashboardConfig } from "../../../lib/config";

// Define the shape of a navigation item.
export interface BuyerNavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

// Get the buyer configuration from your dashboard config.
const buyerConfig = dashboardConfig.getConfig("buyer");
const { routes } = buyerConfig;

export const buyerNavItems: BuyerNavItem[] = [
  { path: routes.home, label: "Home", icon: <FaHome size={18} /> },
  { path: routes.products, label: "Products", icon: <Store size={18} /> },
  { path: routes.trackOrder, label: "Track Order", icon: <Map size={18} /> },
  {
    path: routes.notifications,
    label: "Notification",
    icon: <MessageSquare size={18} />,
  },
];
