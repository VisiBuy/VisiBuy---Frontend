import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../lib/service";
import { LoginCredentials, Role } from "../models/types";
import { getMeQueryKey } from "../queries/queries";
import { useAppDispatch } from "../../../hooks/app-hooks";
import { useNavigate } from "react-router-dom";
import { setCredentials, setError } from "../features/slices";
import { dashboardConfig } from "../../../lib/config";
export function useLogin() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      AuthService.login(credentials),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: getMeQueryKey() });
      dispatch(setCredentials(data));
      dispatch(setError(null));
      const redirectPath = localStorage.getItem("redirectPath");
      if (redirectPath) {
        localStorage.removeItem("redirectPath");
        navigate(redirectPath);
      } else {
        data.role.toLowerCase() === "seller"
          ? navigate(
              dashboardConfig.getFullPath(
                data.role.toLowerCase() as Role,
                "products"
              )
            )
          : navigate(
              dashboardConfig.getConfig(data.role.toLowerCase() as Role)
                .basePath
            );
      }
    },
  });
}
