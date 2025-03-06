import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../modules/Auth/hooks/use-auth";

export const PrivateRoute = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { isAuthenticated, isLoading } = useAuth();

  const location = useLocation();

  if (!isAuthenticated) {
    // Save the attempted route
    localStorage.setItem("redirectPath", location.pathname + location.search);
    return <Navigate to='/login' />;
  }

  return children;
};
