import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/modules/Auth/hooks/use-auth";

export const PrivateRoute = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Ensure the path is a valid relative path before saving it
    const redirectPath = location.pathname + location.search;
    localStorage.setItem("redirectPath", redirectPath);
    return <Navigate to="/login" />;
  }
  // console.log('logger');

  return children;
};
