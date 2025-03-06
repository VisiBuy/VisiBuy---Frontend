import { useAppDispatch, useAppSelector } from "../../../hooks/app-hooks";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { logout, setCredentials, setError } from "../features/slices";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state: RootState) => state.auth);
  return {
    //user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
  };
};
