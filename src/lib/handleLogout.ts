import { useAppDispatch } from "@/hooks/app-hooks";
import { logout } from "@/modules/Auth/features/slices";
import { store } from "@/store/store";
export const handleLogout = () => {
  localStorage.clear();
  store.dispatch(logout());
  
  // Redirect to login page
  window.location.href = "/login";
};
