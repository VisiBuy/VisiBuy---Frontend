// Generic Dashboard Configuration Type
export type DashboardRoutes<
  T extends Record<string, string >,
> = {
  basePath: string;
  routes: T;
};

// Dashboard Configuration Interface
interface DashboardConfigManager<
  UserRole extends string,
  RouteConfig extends Record<string, string >,
> {
  getConfig: (role: UserRole) => DashboardRoutes<RouteConfig>;
  getFullPath: (role: UserRole, routeKey: keyof RouteConfig) => string;
  getRoles: () => UserRole[];
  getRouteLink: (role: UserRole, routeKey: keyof RouteConfig) => string;
  
}

// Dashboard Configuration Function with Generics
export function createDashboardConfig<
  UserRole extends string,
  RouteConfig extends Record<string, string >,
>(
  roleConfigs: Record<UserRole, DashboardRoutes<RouteConfig>>
): DashboardConfigManager<UserRole, RouteConfig> {
  return {
    // Get full configuration for a specific role
    getConfig: (role: UserRole): DashboardRoutes<RouteConfig> => {
      if (!roleConfigs[role]) {
        throw new Error(`No configuration found for role: ${role}`);
      }
      return roleConfigs[role];
    },

    // Generate full path for a specific route
    getFullPath: (role: UserRole, routeKey: keyof RouteConfig): string => {
      const config = roleConfigs[role];
      return `${config.basePath}${config.routes[routeKey]}`;
    },
    getRouteLink: (role: UserRole, routeKey: keyof RouteConfig): string => {
      const config = roleConfigs[role];
      
      return config.routes[routeKey];
    },
    
    // List all available roles
    getRoles: (): UserRole[] => Object.keys(roleConfigs) as UserRole[],
  };
}

export const dashboardConfig = createDashboardConfig({
  seller: {
    basePath: "/dashboard/seller",
    routes: {
      products: "/products",
      orders: "/orders",
      profile: "/profile",
      customers: "customers",
      helpSupport: "/call-support",
      feedback: "/feedback",
    },
  },
  buyer: {
    basePath: "/dashboard/buyer",
    routes: {
      products: "",
      dashboard: "/analytics", // ✅  buyersanalyticspage
      trackOrder: "/track-order",
      // trackOrderDetails: "/track-order/view",
      carts: "/carts",
      notifications: "/notification",
      profile: "/profile",
      fileDispute: "/report",
    },
  },
  admin: { basePath: "/dashboard/admin", routes: {} },
});

