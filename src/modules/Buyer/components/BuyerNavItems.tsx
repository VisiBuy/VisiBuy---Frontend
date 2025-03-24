import React from "react";
import { Store, Map, MessageSquare, FileText } from "lucide-react";
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

// Main navigation items
export const MainNav: BuyerNavItem[] = [
  { path: routes.products, label: "Products", icon: <Store size={18} /> },
  { path: routes.trackOrder, label: "Track Order", icon: <Map size={18} /> },
  {
    path: routes.notifications,
    label: "Notification",
    icon: <MessageSquare size={18} />,
  },
];

// Sub navigation items
export const SubNav: BuyerNavItem[] = [
  {
    path: routes.fileDispute,
    label: "File Dispute",
    icon: <FileText size={18} />,
  },
];
